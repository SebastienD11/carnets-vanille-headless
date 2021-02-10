export default async ({ store }) => {
  await store.dispatch('getSettings')
  await store.dispatch('getPosts')
  await store.dispatch('getCategories')
}
