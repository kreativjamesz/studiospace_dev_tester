import axios from "axios";

const ENDPOINT = "https://api.app.studiospace.com/listings/list-agencies";
const PAGE_SIZE = 12;
const REGIONS = ["AU", "GB", "US"];
const SERVICE_GROUPS = ["Advertising, Brand & Creative", "Media, PR & Events"];

/**
 * Fetch all agencies from the API using pagination.
 */
const fetchAgencies = async () => {
  let skip = 0;
  const agencies = [];
  let total = 0;

  try {
    while (true) {
      // Fetch a batch of agencies
      const { data } = await axios.get(ENDPOINT, { params: { skip } });
      const [batch, totalCount] = data;

      // Ensure the response contains the expected data
      if (!Array.isArray(batch)) {
        throw new Error(
          "Unexpected response format: agencies is not an array."
        );
      }

      // Add batch to the accumulated list
      agencies.push(...batch);

      // Set the total on the first request
      if (skip === 0) {
        total = totalCount;
      }

      // Break the loop if all agencies have been fetched
      if (agencies.length >= total || batch.length < PAGE_SIZE) {
        break;
      }

      // Increment skip for the next batch
      skip += PAGE_SIZE;
    }
  } catch (err) {
    console.error("Error fetching agencies:", err.message);
  }

  return agencies;
};

/**
 * Generate a report from the fetched agencies.
 */
const generateReport = (agencies) => {
  const report = {
    AU: 0,
    GB: 0,
    US: 0,
    Other: 0,
  };

  agencies.forEach((agency) => {
    // Check if the agency offers relevant services
    const hasRelevantServices = agency.agencyService.some((service) =>
      SERVICE_GROUPS.includes(service.service?.serviceGroup?.name)
    );

    // Determine the regions the agency belongs to
    const regions = agency.locations
      .map((location) => location.country?.code)
      .filter((code) => REGIONS.includes(code));

    if (!regions.length || !hasRelevantServices) {
      // Agency belongs to "Other" category
      report.Other += 1;
    } else {
      // Increment counts for each matching region
      regions.forEach((region) => {
        if (REGIONS.includes(region)) {
          report[region] += 1;
        }
      });
    }
  });

  return report;
};

/**
 * Main function to fetch data and generate the report.
 */
const main = async () => {
  console.log("Fetching agencies...");
  const agencies = await fetchAgencies();

  console.log(`Fetched ${agencies.length} agencies.`);
  console.log("Generating report...");
  const report = generateReport(agencies);

  console.log("Report:", report);
};

main().catch((err) => console.error("Unexpected error:", err.message));
