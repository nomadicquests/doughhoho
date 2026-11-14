// Importing an image gives its URL (the bundler copies the file).
declare module '*.svg' {
  const url: string
  export default url
}
