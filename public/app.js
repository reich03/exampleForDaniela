document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:4007/testdata')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.div-name-container');
            console.log(data);
            data.forEach(item => {
                console.log(item);
                const h2 = document.createElement('h2');
                h2.textContent = `Nombre: ${item.name}, Edad: ${item.age}`;
                container.appendChild(h2); 
            });
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            const container = document.querySelector('.div-name-container');
            container.textContent = 'Failed to load data';
        });
});

