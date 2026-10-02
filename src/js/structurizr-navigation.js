function openNavigationModal(options, handler) {
    const navigationList = $('#navigationList');
    navigationList.empty();

    if (options.length > 0) {
        options.forEach(function(option) {
            navigationList.append(
                $('<option></option>').val(option.value).html(option.label).prop('disabled', option.disabled === true).addClass(option.className || '')
            );
        });

        navigationList.attr('size', Math.max(2, options.length));
        const firstEnabled = options.filter(function(option) { return option.disabled !== true; })[0];
        navigationList.val(firstEnabled ? firstEnabled.value : options[0].value);

        if (handler === undefined) {
            handler = navigateTo;
        }

        $('#navigationList').off('click');
        $('#navigationList').on('click', function() {
            $('#navigationModal').modal('hide');
            handler($('#navigationList').val());
        });

        $('#navigationList').off('keydown');
        $('#navigationList').on('keydown', function(e) {
            const enterKeyCode = 13;

            if (e.which === enterKeyCode) {
                e.preventDefault();

                $('#navigationModal').modal('hide');
                handler($('#navigationList').val());
            }
        });

        $('#navigationModal').modal('show');
    }
}

function navigateTo(url) {
    if (url.indexOf('#') === 0) {
        window.location = url;
    } else {
        window.open(url);
    }
}

$('#navigationModal').on('shown.bs.modal', function () {
    structurizr.diagram.setKeyboardShortcutsEnabled(false)
    $('#navigationList').focus();
});

$('#navigationModal').on('hidden.bs.modal', function () {
    structurizr.diagram.setKeyboardShortcutsEnabled(true)
});