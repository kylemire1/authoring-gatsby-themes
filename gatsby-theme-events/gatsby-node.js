const fs = require("fs");

// 1. make sure the data directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = "data";

  if (!fs.existsSync(contentPath)) {
    reporter.info(`Creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

// 2. define the event type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @doneInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dataformat @proxy(from: "start_date")
      endDate: Date! @dataformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `);
};
// 3. define resolvers for custom fields (slug)
// 4. query for events and create pages
