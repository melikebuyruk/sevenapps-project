# Sevenapps Markdown Playground

A real-time Markdown editor and previewer built with React, Tailwind CSS, and Dexie.js.

## Features

### Real-time Markdown Rendering
- See your Markdown rendered as HTML.
- Supports `remark-parse`, `remark-gfm`, and `remark-html` via the `unified` pipeline.

### Sample Loader
- Select sample files like Introduction, Features, and Usage from a drop-down.
- The last selected file and its contents are saved in the browser with IndexedDB.

### Auto-Save with IndexedDB
- Each file (`intro.md`, `features.md`, etc.) is stored independently.
- Changes are automatically saved and restored on page reload.

### Keyboard Shortcuts
- `Ctrl + S`: Save the current content and download the rendered HTML.
- `Ctrl + 1`, `Ctrl + 2`, `Ctrl + 3`: Load corresponding sample files.

### Fullscreen Toggle
- Fullscreen mode for the editor or preview pane.

### HTML Export
- Export the rendered output as a `.html` file.

### Theme Toggle
- Switch between light and dark themes.

### Accessibility
- Uses ARIA-compliant roles and tags.
- Preview pane uses `aria-live="polite"` to notify screen readers of content changes.
- Passes basic Lighthouse accessibility checks.

## Supported Markdown Features
- GitHub-Flavored Markdown (GFM)

  ![resim](https://github.com/user-attachments/assets/ed20252b-6be0-484b-b2c2-36871f2fb255)
  ![resim](https://github.com/user-attachments/assets/824efbef-0876-44b3-a0ed-a7b221012490)


- Task Lists

  ![resim](https://github.com/user-attachments/assets/cd956dc3-3971-4e1e-b896-6b59858383ed)
  ![resim](https://github.com/user-attachments/assets/bbae147d-059a-4c76-bae8-28d2d2b9ff0c)


- Tables
  
  ![resim](https://github.com/user-attachments/assets/22549eef-460d-4e8b-a896-86daec9f3fe7)
  ![resim](https://github.com/user-attachments/assets/91d8d532-4313-4ba1-84fa-d6e3a1d4b491)


- Footnotes

  ![resim](https://github.com/user-attachments/assets/f928905a-2b0e-4cd9-97e1-ae36fa2c2c6b)
  ![resim](https://github.com/user-attachments/assets/d44fd342-0a60-4df4-97f6-434e5f98a9c8)


  

## Technologies Used
- React + TypeScript
- Tailwind CSS 
- Dexie.js (IndexedDB)
- remark + unified 

## Getting Started


### 1. Clone the Repository
```bash
git clone https://github.com/melikebuyruk/sevenapps-project.git
cd sevenapps-project
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```



 
