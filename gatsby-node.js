// gatsby-node.js
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  
  // Only create localized versions for non-404 pages
  if (page.path !== '/404/') {
    deletePage(page);
    
    ['ar', 'en'].forEach(lang => {
      const localizedPath = `/${lang}${page.path}`;
      
      createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          locale: lang,
        },
      });
    });
  }
};