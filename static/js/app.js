// Build the metadata panel

d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  let meta = data
  console.log(meta)
});

function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let meta = data.metadata
   // get the sample using .find()
    value = meta.find(x => x.id === parseInt(sample))

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadata = d3.select("#sample-metadata")

    // clear the metadata each time to delete existing divs
    metadata.html("")

    //get all keys using the Object keyword, and loop through those keys for displaying the key and value on each div
    Object.keys(value).forEach(x => metadata.append('div').text(`${x}: ${value[x]}`))

  });
}



// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((response) => {

    // Get the samples field
    
    let chartData = response.samples
    // Filter the samples for the object with the desired sample number
    let currentShowing = chartData.find(x => x.id === sample)
  
    console.log(currentShowing)
    // Get the otu_ids, otu_labels, and sample_values



    //BAR CHART
    samples = Object.values(currentShowing.otu_ids).slice(0,10).map(x => `OTU ${x} `).reverse()
    
    values = currentShowing.sample_values.slice(0,10).reverse()

    let trace1 = {
      x: values,
      y: samples,
      type: "bar",
      orientation: 'h'
    };
  
    let data = [trace1];
  

    let layout = {
      title: `Top 10 Bacteria Cultures Found`
    };
  
    Plotly.newPlot("bar", data, layout);

    

    bubblex = Object.values(currentShowing.otu_ids)
    bubbley = currentShowing.sample_values
    bubblexticks = Object.values(currentShowing.otu_ids).map(x => String.toString(x))
    labels = currentShowing.otu_labels
 



    //BUBBLECHART

    let trace2 = {

      x: bubblex,
      y: bubbley,
      mode: 'markers',
      text: labels,
      marker: {
        size: bubbley,
        color: bubblex,
        colorscale: "Earth"
      }
      

    }

    let layout2 = {
      title: {
        text: 'Bacteria Cultures Per Sample'
      },
      showlegend: false,
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' }
    
    };


    Plotly.newPlot('bubble', [trace2], layout2);





    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    let names = data.names
  
    let dropdownMenu = d3.select("#selDataset");
    
    names.forEach(x => {
        dropdownMenu.append("option").text(x)
    });

    let first = dropdownMenu.property("value")
    buildMetadata(first)
    buildCharts(first)

    });
    

}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  
  buildMetadata(newSample) 
  buildCharts(newSample)
}

// Initialize the dashboard
init();


