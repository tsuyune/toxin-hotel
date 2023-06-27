import $ from 'jquery';
window.$ = $;

$('.like-button').on('click', function () {
    let elem = $(this.children[1]);
    let likeCount = elem.text();
    $(this).toggleClass('like-button_selected');
    if ($(this).hasClass('like-button_selected')) {
        elem.text(++likeCount);
    }
    else elem.text(--likeCount);
});