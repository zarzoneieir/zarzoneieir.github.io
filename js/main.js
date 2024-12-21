document.addEventListener('DOMContentLoaded', function() {
    loadPages();
});

function loadPages() {
    fetch('data/wiki.json')
        .then(response => response.json())
        .then(data => {
            const pageList = document.getElementById('page-list');
            pageList.innerHTML = '';
            for (let title in data) {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.href = '#';
                a.textContent = title;
                a.onclick = function() {
                    loadPage(title);
                };
                li.appendChild(a);
                pageList.appendChild(li);
            }
        });
}

function loadPage(title) {
    fetch('data/wiki.json')
        .then(response => response.json())
        .then(data => {
            const pageContent = document.getElementById('page-content');
            pageContent.innerHTML = data[title];
            const editContent = document.getElementById('edit-content');
            editContent.value = data[title];
            document.getElementById('edit-section').style.display = 'block';
        });
}

function savePage() {
    const title = document.querySelector('#page-list a.active').textContent;
    const content = document.getElementById('edit-content').value;
    
    fetch('data/wiki.json')
        .then(response => response.json())
        .then(data => {
            data[title] = content;
            return fetch('data/wiki.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(response => {
            if (response.ok) {
                loadPage(title);
            }
        });
}
