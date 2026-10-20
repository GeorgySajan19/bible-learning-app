fetch("https://rest.api.bible/v1/bibles", {
  headers: {
    "api-key": "WIHZGSm_n7urPwc1rwFHd",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => console.log(data.data))
  .catch((error) => console.error(error));