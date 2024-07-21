module.exports = ({ config }) => ({
  ...config,
  name: config.name,
  slug: "care-app", // 이 부분을 프로젝트의 실제 슬러그로 변경
  extra: {
    eas: {
      projectId: "26350636-be2d-4efc-9473-f1ec19c42f4d",
    },
  },
});
