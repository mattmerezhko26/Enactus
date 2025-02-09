// Sanity API configuration
const projectId = 'td08n1oq';
const version = 'v1';
const dataset = 'production';
const apiUrl = `https://${projectId}.api.sanity.io/${version}/data/query/${dataset}`;

// Fetch data from Sanity API
export async function fetchSanityData(query) {
  try {
    const res = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Sanity API request failed: ${res.statusText}`);
    }

    const { result } = await res.json();
    return result;
  } catch (err) {
    console.error('Error fetching Sanity data:', err);
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

// Fetch and map member data from Sanity API with session storage caching
export async function getMemberData() {
  const CACHE_KEY = 'enactus_member';
  const CACHE_EXPIRY_KEY = 'enactus_member_expiry';
  const CACHE_DURATION = 24 * 60 * 60 * 1000;

  // Check if cached data exists and is still valid
  const cachedData = sessionStorage.getItem(CACHE_KEY);
  const cachedExpiry = sessionStorage.getItem(CACHE_EXPIRY_KEY);

  if (cachedData && cachedExpiry && Date.now() < parseInt(cachedExpiry, 10)) {
    try {
      return JSON.parse(cachedData);
    } catch (err) {
      console.error('Error parsing cached member data:', err);
    }
  }

  try {
    const memberData = await fetchSanityData('*[_type == "member"]');
    const departmentData = await fetchSanityData('*[_type == "department"]');
    const positionData = await fetchSanityData('*[_type == "position"]');

    // Create lookup tables for position and department data
    const departmentLookup = createLookup(departmentData, '_id');
    const positionLookup = createLookup(positionData, '_id');

    const mappedMembers = memberData.map((member) => mapMemberData(member, positionLookup, departmentLookup));

    const args = ['firstName', 'lastName', 'position', 'department', 'personImg', 'personalURL', 'priority'];
    const processedMembers = await processSanityData(mappedMembers, args);

    // Sort members by priority and position
    processedMembers.sort((a, b) => a.priority - b.priority || a.position.localeCompare(b.position));

    // Cache the processed data
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(processedMembers));
      sessionStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
    } catch (storageError) {
      console.warn('Session storage is full or disabled:', storageError);
    }
    // console.log(processedMembers);
    return processedMembers;
  } catch (err) {
    console.error('Error fetching member data:', err);
    return [];
  }
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
export function convertSanityAssetRefToUrl(assetRef, projectId = 'td08n1oq', dataset = 'production') {
  const [type, assetId, dimensions, format] = assetRef.split('-');
  // use the following query parameters to modify the image size: '?w=800&h=800&fit=crop&auto=format'
  // w → width, h → height
  // fit=crop → cut off any excess image to fit the specified dimensions
  // auto=format → automatically determine the best image format (e.g., WebP)
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}?w=800&h=800&fit=crop&auto=format`;
}

export function addClasses(element, classes) {
  classes.forEach((cls) => element.classList.add(cls));
}
