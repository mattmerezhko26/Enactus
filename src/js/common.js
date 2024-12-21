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
    } catch (error) {
      console.error('Error parsing cached member data:', error);
      // Fall back to fetching fresh data if parsing fails
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

    const args = ['firstName', 'lastName', 'position', 'department', 'personImg', 'personalURL'];
    const processedMembers = await processSanityData(mappedMembers, args);

    // Cache the processed data
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(processedMembers));
      sessionStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
    } catch (storageError) {
      console.warn('Session storage is full or disabled:', storageError);
    }

    return processedMembers;
  } catch (error) {
    console.error('Error fetching member data:', error);
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
export function convertSanityAssetRefToUrl(assetRef, projectId='td08n1oq', dataset='production') {
  const [type, assetId, dimensions, format] = assetRef.split('-');
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`;
}

export function addClasses(element, classes) {
  classes.forEach((cls) => element.classList.add(cls));
}
