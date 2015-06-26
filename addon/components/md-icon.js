import Ember from 'ember';
import LayoutRules from '../mixins/layout-rules';
import StyleSafe from '../mixins/style-safe';

var MdIcon = Ember.Component.extend(LayoutRules, StyleSafe, {
    iconService: Ember.inject.service('icon'),

    tagName: 'md-icon',

    didInsertElement() {
        this._super(...arguments);
        this.setupIcon();
    },

    iconName: Ember.computed('md-svg-icon', 'md-svg-src', function() {
        return this.get('md-svg-icon') || this.get('md-svg-src') || '';
    }),

    classNameBindings: ['iconClass'],

    fontIcon: Ember.computed('mdFontIcon', function() {
        return 'md-font ' + this.get('mdFontIcon');
    }),

    loadIcon: Ember.observer('iconName', function() {
        var iconName = this.get('iconName'),
            element = this.$();

        element.empty();
        if (iconName) {
            var is = this.get('iconService');
            is.getIcon(iconName)
                .then(function(svg) {
                    element.append(svg);
                });
        }
    }),

    setupIcon() {
        if (!this.get('mdFontIcon')) {
            this.loadIcon();
        }
    }

});

export default MdIcon;
