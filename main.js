$.ajax({
    'url': '//data.iana.org/TLD/tlds-alpha-by-domain.txt',
    'dataType': 'plain'
}).always((data, a, b) => {
    // console.log(data.responseText);
    setList(data.responseText);
    setupSearch();
});

function setList(requestText) {
    var tlds = requestText.split('\n');
    tlds.shift();

    fragment = document.createDocumentFragment();
    for (let tld of tlds) {
        // name = name.toLowerCase();
        const li = document.createElement('li');
        li.textContent = tld;
        fragment.appendChild(li);
    }

    const container = document.getElementById('live-search-list');
    container.appendChild(fragment);
}

function setupSearch() {
    $('.live-search-list li').each(function () {
        $(this).attr('data-search-term', $(this).text().toLowerCase());
    });

    $('.live-search-box').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase();

        $('.live-search-list li').each(function () {
            if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
                $(this).show();
            } else {
                $(this).hide();
            }

        });

    });
}
