const fetchCountryFlags = async () => {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json"
    );
    const data = await response.json();

    // Map the data to the format required by the picker
    return data.map((country) => ({
      label: country.name + " " + country.emoji,
      value: country.name,
    }));
  } catch (error) {
    console.error("Failed to fetch country flags:", error);
    return []; // Return an empty array or appropriate default value on error
  }
};

export default fetchCountryFlags;
