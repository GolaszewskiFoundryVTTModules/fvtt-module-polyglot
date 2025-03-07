import { currentLanguageProvider, getDefaultLanguageProvider, updateLanguageProvider } from "./api.js"
import { PolyglotLanguageSettings } from "./LanguageSettings.js"
import { legacyGenericSystem } from "./logic.js"

const debouncedReload = foundry.utils.debounce(() => {
	window.location.reload();
}, 100);

/**
 * Shorthand for game.settings.register.
 * Default data: {scope: "world", config: true}
 * @function addSetting
 * @param {string} key
 * @param {object} data
 */
function addSetting (key, data) {
	const commonData = {
		scope: "world",
		config: true
	};
	game.settings.register("polyglot", key, Object.assign(commonData, data));
}

export function registerSettings() {
	game.settings.registerMenu("polyglot", "LanguageSettings", {
		name: "Language Settings",
		label: "Language Settings",
		icon: "fas fa-globe",
		type: PolyglotLanguageSettings,
		restricted: true
	});
	game.settings.register("polyglot", "Alphabets", {
		name: game.i18n.localize("POLYGLOT.AlphabetsTitle"),
		hint: game.i18n.localize("POLYGLOT.AlphabetsHint"),
		scope: "world",
		config: false,
		default: {},
		type: Object
	});
	game.settings.register("polyglot", "Languages", {
		name: game.i18n.localize("POLYGLOT.LanguagesTitle"),
		hint: game.i18n.localize("POLYGLOT.LanguagesHint"),
		scope: "world",
		config: false,
		default: {},
		type: Object
	});
	game.settings.register("polyglot", "languageProvider", {
		scope: "world",
		config: false,
		type: String,
		default: getDefaultLanguageProvider(),
		onChange: updateLanguageProvider
	})

	game.settings.register("polyglot", "defaultLanguage", {
		name: game.i18n.localize("POLYGLOT.DefaultLanguageTitle"),
		hint: game.i18n.localize("POLYGLOT.DefaultLanguageHint"),
		scope: "client",
		config: true,
		default: "",
		type: String
	});

	//Font Settings
	addSetting("useUniqueSalt", {
		name: game.i18n.localize("POLYGLOT.RandomizeRunesTitle"),
		hint: game.i18n.localize("POLYGLOT.RandomizeRunesHint"),
		default: "a",
		type: String,
		choices: {
			"a" : game.i18n.localize("POLYGLOT.RandomizeRunesOptions.a"),
			"b" : game.i18n.localize("POLYGLOT.RandomizeRunesOptions.b"),
			"c" : game.i18n.localize("POLYGLOT.RandomizeRunesOptions.c")
		},
	});
	addSetting("logographicalFontToggle", {
		name: game.i18n.localize("POLYGLOT.logographicalFontToggleTitle"),
		hint: game.i18n.localize("POLYGLOT.logographicalFontToggleHint"),
		default: true,
		type: Boolean
	});
	game.settings.register("polyglot", "enableAllFonts", {
		name: game.i18n.localize("POLYGLOT.enableAllFontsTitle"),
		hint: game.i18n.localize("POLYGLOT.enableAllFontsHint"),
		scope: "world",
		config: legacyGenericSystem(),
		default: false,
		type: Boolean,
		onChange: () => {
			currentLanguageProvider.loadAlphabet();
			game.settings.set("polyglot", "Alphabets", currentLanguageProvider.alphabets)
		}
	});
	addSetting("exportFonts", {
		name: game.i18n.localize("POLYGLOT.ExportFontsTitle"),
		hint: game.i18n.localize("POLYGLOT.ExportFontsHint"),
		default: true,
		type: Boolean,
		onChange: () => window.polyglot.polyglot.updateConfigFonts()
	});
	addSetting("JournalHighlight", {
		name: game.i18n.localize("POLYGLOT.JournalHighlightTitle"),
		hint: game.i18n.localize("POLYGLOT.JournalHighlightHint"),
		default: 25,
		type: Number,
		onChange: (value) => document.documentElement.style.setProperty('--polyglot-journal-opacity', value/100)
	});

	//Language Settings
	addSetting("replaceLanguages", {
		name: game.i18n.localize("POLYGLOT.ReplaceLanguagesTitle"),
		hint: game.i18n.localize("POLYGLOT.ReplaceLanguagesHint"),
		default: false,
		type: Boolean,
		onChange: async () => {
			await currentLanguageProvider.getLanguages();
			currentLanguageProvider.loadTongues();
			currentLanguageProvider.reloadLanguages();
		} 
	});
	addSetting("customLanguages", {
		name: game.i18n.localize("POLYGLOT.CustomLanguagesTitle"),
		hint: game.i18n.localize("POLYGLOT.CustomLanguagesHint"),
		default: "",
		type: String,
		onChange: () => {
			currentLanguageProvider.loadTongues();
			currentLanguageProvider.reloadLanguages();
		}
	});
	addSetting("comprehendLanguages", {
		name: game.i18n.localize("POLYGLOT.ComprehendLanguagesTitle"),
		hint: game.i18n.localize("POLYGLOT.ComprehendLanguagesHint"),
		default: "",
		type: String,
		onChange: (value) => window.polyglot.polyglot.comprehendLanguages = value.trim().replace(/ \'/g, "_")
	});
	addSetting("truespeech", {
		name: game.i18n.localize("POLYGLOT.TruespeechTitle"),
		hint: game.i18n.localize("POLYGLOT.TruespeechHint"),
		default: "",
		type: String,
		onChange: (value) => window.polyglot.polyglot.truespeech = value.trim().replace(/ \'/g, "_")
	});

	//Chat Settings
	addSetting("display-translated", {
		name: game.i18n.localize("POLYGLOT.DisplayTranslatedTitle"),
		hint: game.i18n.localize("POLYGLOT.DisplayTranslatedHint"),
		default: true,
		type: Boolean
	});
	addSetting("hideTranslation", {
		name: game.i18n.localize("POLYGLOT.HideTranslationTitle"),
		hint: game.i18n.localize("POLYGLOT.HideTranslationHint"),
		default: false,
		type: Boolean,
		onChange: () => debouncedReload()
	});
	addSetting("allowOOC", {
		name: game.i18n.localize("POLYGLOT.AllowOOCTitle"),
		hint: game.i18n.localize("POLYGLOT.AllowOOCHint"),
		choices: {
			"a" : game.i18n.localize("POLYGLOT.AllowOOCOptions.a"),
			"b" : game.i18n.localize("POLYGLOT.AllowOOCOptions.b"),
			"c" : game.i18n.localize("POLYGLOT.AllowOOCOptions.c"),
			"d" : game.i18n.localize("POLYGLOT.AllowOOCOptions.d")
		},
		default: "b",
		type: String
	});
	addSetting("runifyGM", {
		name: game.i18n.localize("POLYGLOT.ScrambleGMTitle"),
		hint: game.i18n.localize("POLYGLOT.ScrambleGMHint"),
		default: false,
		type: Boolean,
		onChange: () => debouncedReload()
	});
}