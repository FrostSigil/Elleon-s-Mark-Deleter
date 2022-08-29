"use strict"

const markId = 151643; 

module.exports = function MarkDeleter(mod) {
	const command = mod.command;
	let enabled = true;
	let myGameId = 0n;
		
    command.add('emd', {
		"del": arg => {
			const n = Number(arg);
			mod.settings.amount = n;
				mod.command.message(`Delete <font color="#5da8ce">${n}</font>`);			
		},
        $none() {
            enabled = !enabled;
			command.message(`Elleon's Mark Deleter : ${enabled ? "enabled" : "disabled"}.`);
		}
	});
	
	mod.hook('S_LOGIN', 14, (event) => {
		myGameId = event.gameId;
	})
	
	mod.hook('S_ITEMLIST', 4, (event) => {
			if (!enabled) return;
			
			for (var i = 0; i < event.items.length; i++)
			{
				if (event.items[i].id === markId && event.items[i].amount > 1700)
				{
					mod.toServer('C_DEL_ITEM', 3, {
						gameId: myGameId,
						pocket: event.pocket,
						slot: event.items[i].slot,
						amount: mod.settings.amount
					});
					break;
				}
			}
	});
	
}