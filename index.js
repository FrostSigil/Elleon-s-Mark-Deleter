
const markId = 151643; 

module.exports = function MarkDeleter(mod) {
	const command = mod.command;
	let enabled = true;
	let myGameId = 0n;
		
    command.add('emd', {
        $none() {
            enabled = !enabled;
			command.message(`Elleon's Mark Deleter is now: ${enabled ? "enabled" : "disabled"}.`);
		}
	});
	
	mod.hook('S_LOGIN', mod.majorPatchVersion >= 86 ? 14 : 13, (event) => {
		myGameId = event.gameId;
	})
	
	if(mod.majorPatchVersion >= 85)
	{
		mod.hook('S_ITEMLIST', mod.majorPatchVersion >= 87 ? 4 : 2, (event) => {
			if (!enabled) return;
			
			for (var i = 0; i < event.items.length; i++)
			{
				if (event.items[i].id === markId && event.items[i].amount > 1700)
				{
					mod.toServer('C_DEL_ITEM', 3, {
						gameId: myGameId,
						pocket: event.pocket,
						slot: event.items[i].slot,
						amount: 100
					});
					break;
				}
			}
		});
	}
	else
	{
		mod.hook('S_INVEN', 19, (event) => {
		if (!enabled) return;
		
		for (var i = 0; i < event.items.length; i++)
		{
			if (event.items[i].id === markId && event.items[i].amount > 1700)
			{
				mod.toServer('C_DEL_ITEM', 3, {
					gameId: myGameId,
					slot: (event.items[i].slot - 40),
					amount: 100
				});
				break;
			}
		}
	});
	}
}