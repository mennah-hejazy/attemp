document.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(products => {
          localStorage.setItem('products', JSON.stringify(products));
          renderProducts(products);
      })
      .catch(error => console.error('Error fetching products:', error));
  function renderProducts(products) {
      const group1Products = products.slice(0, 4); 
      const group2Products = products.slice(4);
      const productLists = document.querySelectorAll('.product-list');
      productLists.forEach(productList => {
          const group1Container = productList.querySelector('.group-1');
          const group2Container = productList.querySelector('.group-2');
          const viewAllButton = productList.querySelector('.view-all');
          group1Container.innerHTML = '';
          group2Container.innerHTML = '';
          group1Products.forEach(product => {
              const productItem = createProductItem(product);
              if (productItem) {
                  group1Container.appendChild(productItem);
              }
          });
          group2Products.forEach(product => {
              const productItem = createProductItem(product);
              if (productItem) {
                  group2Container.appendChild(productItem);
              }
          });
          viewAllButton.addEventListener('click', () => {
              toggleGroupVisibility(group2Container, viewAllButton);
          });
      });
  }
  function createProductItem(product) {
      const listItem = document.createElement('li');
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.title;
      img.style.maxWidth = '100px';
      listItem.appendChild(img);
      const title = document.createElement('h2');
      title.textContent = product.title;
      listItem.appendChild(title);
      const price = document.createElement('p');
      price.textContent = `Price: $${product.price}`;
      listItem.appendChild(price);
      const description = document.createElement('p');
      description.textContent = product.description;
      listItem.appendChild(description);
      const link = document.createElement('a');
      link.href =  `product/product.html?id=${product.id}`;
      link.textContent = 'View Details';
      listItem.appendChild(link);

      return listItem;
  }

  function toggleGroupVisibility(group2Container, viewAllButton) {
      const isGroup2Visible = group2Container.style.display === 'flex';
      group2Container.style.display = isGroup2Visible ? 'none' : 'flex';
      if (isGroup2Visible) {
          viewAllButton.textContent = 'View All';
      } else {
          viewAllButton.textContent = 'View Less';
      }
  }
});