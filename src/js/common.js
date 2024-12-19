// Sanity API configuration
const projectId = 'td08n1oq';
const version = 'v1';
const dataset = 'production';
const apiUrl = `https://${projectId}.api.sanity.io/${version}/data/query/${dataset}`;

// Fetch data from Sanity API
export async function fetchSanityData(query) {
  try {
    const response = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Sanity API request failed: ${response.statusText}`);
    }

    const { result } = await response.json();
    return result;
  } catch (err) {
    console.err('Error fetching Sanity data:', err);
    return [];
  }
}

// Process and format fetched data based on specific fields
export async function processSanityData(data, fields = []) {
  if (fields.length === 0) return data;

  return data.map((item) => {
    return fields.reduce((acc, field) => {
      if (item.hasOwnProperty(field)) {
        acc[field] = item[field];
      }
      return acc;
    }, {});
  });
}

// Fetch and map member data from Sanity API
export async function getMemberData() {
  const memberData = await fetchSanityData('*[_type == "member"]');
  const departmentData = await fetchSanityData('*[_type == "department"]');
  const positionData = await fetchSanityData('*[_type == "position"]');

  // Create lookup tables for position and department data
  const departmentLookup = createLookup(departmentData, '_id');
  const positionLookup = createLookup(positionData, '_id');

  const mappedMembers = memberData.map((member) => mapMemberData(member, positionLookup, departmentLookup));

  const args = ['firstName', 'lastName', 'position', 'department', 'personImg'];
  return await processSanityData(mappedMembers, args);
}

// Create a lookup table from data based on a given key
function createLookup(data, key) {
  return data.reduce((lookup, item) => {
    lookup[item[key]] = item;
    return lookup;
  }, {});
}

// Map member data to include department and position titles, and convert image URL
function mapMemberData(member, positionLookup, departmentLookup) {
  const position = positionLookup[member.position._ref];
  const department = departmentLookup[member.department._ref];
  const assetRef = member?.personImg?.asset._ref;
  const personImg = assetRef ? convertSanityAssetRefToUrl(assetRef, projectId, dataset) : '';

  return {
    ...member,
    position: position ? position.title : null,
    department: department ? department.title : null,
    personImg: personImg,
  };
}

// Convert Sanity asset reference to image URL
export function convertSanityAssetRefToUrl(assetRef, projectId='td08n1oq', dataset='production') {
  const [type, assetId, dimensions, format] = assetRef.split('-');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
}

export function addClasses(element, classes) {
  classes.forEach((cls) => element.classList.add(cls));
}
