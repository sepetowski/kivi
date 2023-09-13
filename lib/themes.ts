import { AvaibleThemes } from '@prisma/client';

export const colorStrenght = 600;
const focusStrenght = 300;

export const themes = [
	{
		type: AvaibleThemes.BLUE,
		color: `bg-blue-${colorStrenght}`,
		focus: `focus:bg-blue-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.CYAN,
		color: `bg-cyan-${colorStrenght}`,
		focus: `focus:bg-cyan-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.EMERALD,
		color: `bg-emerald-${colorStrenght}`,
		focus: `focus:bg-emerald-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.GREEN,
		color: `bg-green-${colorStrenght}`,
		focus: `focus:bg-green-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.INDIGO,
		color: `bg-indigo-${colorStrenght}`,
		focus: `focus:bg-indigo-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.LIME,
		color: `bg-lime-${colorStrenght}`,
		focus: `focus:bg-lime-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.FUCHSIA,
		color: `bg-fuchsia-${colorStrenght}`,
		focus: `focus:bg-fuchsia-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.ORANGE,
		color: `bg-orange-${colorStrenght}`,
		focus: `focus:bg-orange-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.PINK,
		color: `bg-pink-${colorStrenght}`,
		focus: `focus:bg-pink-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.PURPLE,
		color: `bg-purple-${colorStrenght}`,
		focus: `focus:bg-purple-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.RED,
		color: `bg-red-${colorStrenght}`,
		focus: `focus:bg-red-${focusStrenght}`,
	},
	{
		type: AvaibleThemes.YELLOW,
		color: `bg-yellow-${colorStrenght}`,
		focus: `focus:bg-yellow-${focusStrenght}`,
	},
];
