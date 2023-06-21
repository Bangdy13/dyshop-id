class APIFilters {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: { $regex: this.queryString.keyword, $options: "i" },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryFilter = { ...this.queryString };

    const removeFields = ["keyword", "page"];
    removeFields.forEach((element) => delete queryFilter[element]);

    let output = {};
    let prop = "";

    for (let key in queryFilter) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryFilter[key];
      } else {
        prop = key.split("[")[0];

        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }

        output[prop][`$${operator}`] = queryFilter[key];
      }
    }
    this.query = this.query.find(output);
    return this;
  }
  pagination(resPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
