
# Timeless Collections

Timeless Collections is a website that allows users to browse two artwork/artifact collections and view detailed information about them. Users can curate and create their own personal exhibitions and store a collection of artwork to view at their leisure.

# URL deployed
https://museum-jet.ve
￼
rcel.app/

## Installation

To set up the project locally, follow these steps:


```bash
git clone https://github.com/J-H1993/museum.git
cd museum
npm install
npm run dev
```

## Dependencies

This project uses the following dependencies:

- **axios**
- **bootstrap**
- **react**
- **react-dom**
- **react-router-dom**

## Project Tutorial

Upon opening the site, users are brought to the **Home Page**, where they can select between:
- The **Metropolitan Museum** collection
- The **Art Institute of Chicago** collection

### **Features:**
- The collection can be filtered using the available dropdown beneath the API selection.
- Clicking **Personal Exhibits** or **Manage Personal Exhibits** navigates to the **Exhibit Management** page, where users can create or delete exhibits.
- Clicking on an artifact in a collection opens its **Detail Page**, displaying information about its creation and history.
- At the bottom of the **Artifact Page**, users can:
  - Select an existing personal exhibition from a dropdown to save the artifact.
  - Create a new personal exhibition.
- **Personal exhibitions are currently stored in local storage**.
- The **Footer** contains links to the Metropolitan Museum and the Art Institute of Chicago, depending on the collection being viewed.

## Configuration

No API keys or configuration files are required for this project to function. However, this may change in future updates.

## Acknowledgments

I would like to thank both the **Metropolitan Museum** and the **Art Institute of Chicago** for making their collections available for use.

## License

This project is open-source and licensed under the **MIT License**.

