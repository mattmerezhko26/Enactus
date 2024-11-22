// Sanity API configuration
const projectId = 'td08n1oq';
const version = 'v1';
const apiUrl = `https://${projectId}.api.sanity.io/${version}/data/query/production`;

// fetch data from Sanity
export async function fetchSanityData(query) {
  try {
    const response = await fetch(`${apiUrl}?query=${encodeURIComponent(query)}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Sanity API request failed: ${response.statusText}`);
    }

    const { result } = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching Sanity data:', error);
  }
}

export async function processSanityData(data, fields = []) {
  if (fields.length === 0) return data;

  const formatData = data.map((item) => {
    return fields.reduce((acc, field) => {
      if (item.hasOwnProperty(field)) {
        acc[field] = item[field];
      }
      return acc;
    }, {});
  });
  return formatData;
}
