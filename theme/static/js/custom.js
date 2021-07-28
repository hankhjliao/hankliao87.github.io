$(function () {
    console.log('run');
    $('table').each(function () {
        $(this).addClass('table table-sm table-hover');
        $(this).wrap('<div class="table-responsive"></div>');
    });
    Footnotes.setup();
});

var Footnotes = {
    footnotetimeout: false,

    setup: function () {
        var footnotelinks = $("a[class='footnote-ref']")

        footnotelinks.unbind('mouseover', Footnotes.footnoteover);
        footnotelinks.unbind('mouseout', Footnotes.footnoteoout);

        footnotelinks.bind('mouseover', Footnotes.footnoteover);
        footnotelinks.bind('mouseout', Footnotes.footnoteoout);
    },

    footnoteover: function () {
        clearTimeout(Footnotes.footnotetimeout);

        $('#footnotediv').stop();
        $('#footnotediv').remove();

        var id = $(this).attr('href').substr(1);
        var el = document.getElementById(id);
        var position = $(this).offset();

        var div = $(document.createElement('div'));
        div.attr('id', 'footnotediv');
        div.bind('mouseover', Footnotes.divover);
        div.bind('mouseout', Footnotes.footnoteoout);
        div.html($(el).html());
        div.find("a[class='footnote-backref']").remove();
        div.css({
            position:'absolute',
            width:'400px',
            background:'white',
        });
        div.addClass('border border-dark rounded p-1');
        $(document.body).append(div);

        var left = position.left;
        if (left + 420 > $(window).width() + $(window).scrollLeft())
            left = $(window).width() - 420 + $(window).scrollLeft();
        var top = position.top + 20;
        if (top + div.height() > $(window).height() + $(window).scrollTop())
            top = position.top - div.height() - 15;

        div.css({
            left: left,
            top: top
        });

    },
    footnoteoout: function () {
        Footnotes.footnotetimeout = setTimeout(function () {
            $('#footnotediv').remove();
        }, 100);
    },
    divover: function () {
        clearTimeout(Footnotes.footnotetimeout);
        $('#footnotediv').stop();
    }
}
