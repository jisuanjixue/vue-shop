module.exports = {
  output: "api",
  template: "axios",
  projects: [
    {
      id: " 5ae3f97f006ea6566d8063d7",
      name: "product", // 生成到 api/product目录下。
      black: [
        "/query" // 排除 query 接口
      ]
    }
  ]
};
