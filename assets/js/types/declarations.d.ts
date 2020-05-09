declare module "*.scss?module" {
  const content: { [className: string]: string }
  export = content
}

declare module "*.svg" {
  const content: string
  export default content
}
