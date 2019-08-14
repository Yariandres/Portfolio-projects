document.title = "Amazon Ads search term Analyser";

window.onload = async () => {
  const response = await fetch('../data/data.json');
  const stats = await response.json();

  console.log(stats.features[0].properties)

}