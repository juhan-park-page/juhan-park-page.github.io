(function () {
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var caption = document.getElementById('lightbox-caption');
    var current = 0;

    function show(i) {
        current = (i + items.length) % items.length;
        var item = items[current];
        lightboxImg.src = item.dataset.full;
        lightboxImg.alt = item.querySelector('img').alt;
        caption.textContent = item.dataset.caption || '';
    }

    function open(i) {
        show(i);
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.hidden = true;
        lightboxImg.src = '';
        document.body.style.overflow = '';
        items[current].focus();
    }

    items.forEach(function (item, i) {
        item.addEventListener('click', function () { open(i); });
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open(i);
            }
        });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', close);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function (e) {
        e.stopPropagation();
        show(current - 1);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', function (e) {
        e.stopPropagation();
        show(current + 1);
    });

    // click the backdrop (but not the image or the buttons) to dismiss
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(current - 1);
        else if (e.key === 'ArrowRight') show(current + 1);
    });
})();
