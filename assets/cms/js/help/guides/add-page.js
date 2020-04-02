/* jshint unused:vars, undef:true, browser:true, jquery:true */
/* global ccmi18n_helpGuides, ConcreteHelpGuideManager, Tour, ConcreteEvent */

;(function(global, $) {

	ConcreteHelpGuideManager.register('add-page', function() {
		var i18n = ccmi18n_helpGuides['add-page'];
		var steps = [{
			content: '<p><span class="h5">' + i18n[0].title + '</span><br/>' + i18n[0].text + '</p>',
			highlightTarget: true,
			nextButton: false,
			closeButton: true,
			target: $('[data-guide-toolbar-action=sitemap]'),
			my: 'top right',
			at: 'bottom center',
			setup: function(tour, options) {
				$('a[data-launch-panel=sitemap]').on('click', function() {
					tour.view.tip.hide();
					ConcreteHelpGuideManager.hideOverlay();
				});
				ConcreteEvent.subscribe('PanelOpen.concreteAddPageTour', function(e, data) {
					setTimeout(function() {
						var panel = data.panel.getIdentifier();
						if (panel == 'sitemap') {
							tour.next();
						}
					}, 500);
				});
			}
		},{
			content: '<p><span class="h5">' + i18n[1].title + '</span><br/>' + i18n[1].text + '</p>',
			highlightTarget: true,
			nextButton: true,
			closeButton: true,
			my: 'right center',
			at: 'left center',
			setup: function(tour, options) {
				return {target: $('ul.ccm-panel-sitemap-list li a').eq(0)};
			}
		},{
			content: '<p><span class="h5">' + i18n[2].title + '</span><br/>' + i18n[2].text + '</p>',
			highlightTarget: true,
			nextButton: true,
			closeButton: true,
			my: 'right center',
			at: 'left center',
			setup: function(tour, options) {
				return {target: $('div#ccm-sitemap-panel-sitemap')};
			}
		}];

		return new Tour({
			steps: steps,
			tipClass: 'Bootstrap',
			tipOptions:{
				showEffect: 'slidein'
			},
            framework: 'bootstrap4',
            onStart: function() {
                ConcreteHelpGuideManager.enterToolbarGuideMode();
            },
            onEnd: function() {
                ConcreteHelpGuideManager.exitToolbarGuideMode();
                ConcreteEvent.unsubscribe('PanelOpen.concreteAddPageTour');
            },
		});
	});

})(window, jQuery);
