# iconoir-font

Web font with the great iconoir-icons

## Demo

✨ [https://iconoir-font.com](https://iconoir-font.com) ✨

## Requirements

- [pnpm](https://pnpm.io/)

## 😍 The dependencies

- The icon library > [iconoir](https://github.com/iconoir-icons/iconoir)
- The font generator > [fantasticon](https://github.com/tancredi/fantasticon)
- The SVG optimizer > [svgo](https://github.com/svg/svgo)

## 🥰 The tools

- The SVG editor (stroke to outline) > [Inkscape](https://inkscape.org/fr/)
- The time saver > [Power Automate](https://powerautomate.microsoft.com)

## 😘 The extras icons (UnOfficial)

- uo-xxx

## 🤩 Use iconoir-font

### Development

- Fork & clone the repository

- install

```
pnpm i
```

- Put your svg outline icons in the "origin" folder

- Clean & optimize SVG files then Generate the font with :

```
pnpm build
```

> /!\ Please note, however, that some icons in the original repository may not be rendered correctly for various reasons. In this case, you'll need to fix them in Inskcape before building.

### Production

- Install

```
pnpm i iconoir-font
```

- Retrieve the font from the dist folder and integrate the styles.css file into your project.

- Add an icon in your code

```html
<i class="iconoir iconoir-cube"></i>
```
