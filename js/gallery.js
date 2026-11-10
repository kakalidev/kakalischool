$(function () {
  const filterButtons = $('.gallery .controls .buttons');
  const galleryImages = $('.gallery .image-container .image');
  const status = $('.gallery-status');

  const applyFilter = (button) => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    const panel = document.querySelector('#gallery-panel');

    filterButtons.each(function () {
      const isSelected = this === button;
      this.classList.toggle('active', isSelected);
      this.setAttribute('aria-selected', String(isSelected));
      this.tabIndex = isSelected ? 0 : -1;
    });
    panel?.setAttribute('aria-labelledby', button.id);

    galleryImages.each(function () {
      const isVisible = filter === 'all' || this.classList.contains(filter);
      this.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    status.text(`Showing ${visibleCount} ${visibleCount === 1 ? 'photo' : 'photos'}`);
  };

  filterButtons.on('click', function () {
    applyFilter(this);
  });

  filterButtons.on('keydown', function (event) {
    const currentIndex = filterButtons.index(this);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % filterButtons.length;
    else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + filterButtons.length) % filterButtons.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = filterButtons.length - 1;
    else return;

    event.preventDefault();
    const nextButton = filterButtons.get(nextIndex);
    nextButton.focus();
    applyFilter(nextButton);
  });

  applyFilter(filterButtons.filter('[aria-selected="true"]')[0]);

  $('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: { enabled: true }
  });
});
