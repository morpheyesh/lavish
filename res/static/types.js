define('types', function() {

    function Type(ident, modifiers) {
        this.ident = ident;
        this.modifiers = modifiers || [];
    }

    Type.prototype.toString = function() {
        return this.ident + (this.modifiers.length ? '<' + this.modifiers.join(', ') + '>' : '');
    };

    return {
        'void': new Type('void'),

        'string': new Type('string'),
        'num': new Type('num'),

        'Blob': new Type('Blob'),
        'Date': new Type('Date'),
        'DiskEntry': new Type('DiskEntry'),

        'string[]': new Type('Array', ['string']),
        'DiskEntry[]': new Type('Array', ['DiskEntry']),
    };
});
