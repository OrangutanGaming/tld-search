$.ajax({
    'url': '//data.iana.org/TLD/tlds-alpha-by-domain.txt',
    'dataType': 'plain'
}).always((data) => {
    setList(data.responseText);
    setupSearch();
});

function setList(requestText) {
    let tlds = requestText.split('\n');
    const dataFromFull = tlds.shift();

    const regex = /# Version \d+, Last Updated ([a-zA-Z 0-9:]+)/;

    const dataFrom = `Data from ${regex.exec(dataFromFull)[1]}`;

    $('#data-from').text(dataFrom);

    const fragment = document.createDocumentFragment();
    for (let tld of tlds) {
        const li = document.createElement('li');
        li.textContent = tld;
        fragment.appendChild(li);
    }

    const container = $('#live-search-list')[0];
    container.appendChild(fragment);
}

function setupSearch() {
    $('.live-search-list li').each((index, elem) => {
        elem = $(elem);
        elem.attr('data-search-term', elem.text().toLowerCase());
    });

    $('.live-search-box').keyup((event) => {
        const inputBox = event.target;
        const searchTerm = inputBox.value.toLowerCase();

        $('.live-search-list li').each((index, elem) => {
            elem = $(elem);
            if (elem.filter(`[data-search-term *= ${searchTerm}]`).length > 0 || searchTerm.length < 1) {
                elem.show();
            } else {
                elem.hide();
            }
        });
    });
}
