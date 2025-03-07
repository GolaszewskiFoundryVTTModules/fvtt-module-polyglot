import { currentLanguageProvider, initApi, registerModule, registerSystem } from "./module/api.js";
import { LanguageProvider } from "./module/LanguageProvider.js";
import { Polyglot } from "./module/logic.js";
import { registerSettings } from "./module/settings.js";

Polyglot.FONTS = [
	"ArCiela",
	"Aztec",
	"Barazhad",
	"Celestial",
	"Daedra",
	"DarkEldar",
	"Dethek",
	"DragonAlphabet",
	"ElderFuthark",
	"Eltharin",
	"Espruar",
	"Floki",
	"FingerAlphabet",
	"HighDrowic",
	"HighschoolRunes",
	"Infernal",
	"Iokharic",
	"JungleSlang",
	"Kargi",
	"KremlinPremier",
	"MarasEye",
	"MageScript",
	"MeroiticDemotic",
	"MiroslavNormal",
	"NyStormning",
	"OldeEspruar",
	"OldeThorass",
	"Ophidian",
	"Pulsian",
	"Oriental",
	"OrkGlyphs",
	"Qijomi",
	"Reanaarian",
	"NyStormning",
	"Saurian",
	"ScrapbookChinese",
	"Semphari",
	"Skaven",
	"Tengwar",
	"Thassilonian",
	"Thorass",
	"Tuzluca",
	"Valmaric"
];

window.polyglot = { polyglot: new Polyglot(), fonts: Polyglot.FONTS, registerModule, registerSystem };

Hooks.once("init", () => {
	registerSettings();
	initApi();
});

Hooks.on('renderChatLog', window.polyglot.polyglot.renderChatLog.bind(window.polyglot.polyglot));
Hooks.on('updateUser', window.polyglot.polyglot.updateUser.bind(window.polyglot.polyglot));
Hooks.on('controlToken', window.polyglot.polyglot.controlToken.bind(window.polyglot.polyglot));
Hooks.on('preCreateChatMessage', window.polyglot.polyglot.preCreateChatMessage.bind(window.polyglot.polyglot));
Hooks.on('createChatMessage', window.polyglot.polyglot.createChatMessage.bind(window.polyglot.polyglot));
Hooks.on('renderChatMessage', window.polyglot.polyglot.renderChatMessage.bind(window.polyglot.polyglot));
Hooks.on('renderJournalSheet', window.polyglot.polyglot.renderJournalSheet.bind(window.polyglot.polyglot));
Hooks.on('setup', async () => {
	await currentLanguageProvider.setup();
});
Hooks.on('ready', () => {
	window.polyglot.polyglot.ready();
	if (!Object.keys(game.settings.get("polyglot", "Languages")).length) game.settings.set("polyglot", "Languages", currentLanguageProvider.tongues);
	Hooks.callAll("polyglot.ready", LanguageProvider);
});
Hooks.on("chatBubble", window.polyglot.polyglot.chatBubble.bind(window.polyglot.polyglot)); //token, html, message, {emote}
Hooks.on("vinoPrepareChatDisplayData", window.polyglot.polyglot.vinoChatRender.bind(window.polyglot.polyglot));