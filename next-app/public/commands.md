# Northwind Bot — Full Command Reference

**Total: 227 commands across 58 feature modules**

## `activity.py` (2)

- **/voice-leaderboard** — Top voice-channel time in this server
- **/messages-leaderboard** — Most active chatters in this server

## `afk.py` (1)

- **/afk** — Set yourself as AFK

## `appeals.py` (2)

- **/appeals-channel** — [Admin] Set where appeals get reviewed
- **/appeal** — Submit an appeal for a moderation action taken against you

## `audit.py` (2)

- **/auditlog-channel** — Set the channel where every command usage gets logged.
- **/auditlog** — Show the most recent command usage in this server.

## `automod.py` (3)

- **/automod-bannedwords** — Add or remove banned words (comma-separated).
- **/automod-toggle** — Turn an auto-mod filter on or off.
- **/automod-mentionlimit** — Set the max mentions allowed per message (0 to disable).

## `autoresponder.py` (3)

- **/autoresponder-add** — [Mod] Add a trigger word -> auto-reply
- **/autoresponder-remove** — [Mod] Remove an autoresponder
- **/autoresponder-list** — List all autoresponders

## `birthdays.py` (3)

- **/birthday-set** — Set your birthday (month/day only, no year stored)
- **/birthdays** — List upcoming birthdays this server has on file
- **/birthday-channel** — [Admin] Set the channel birthday announcements post to

## `confessions.py` (2)

- **/confessions-channel** — [Admin] Set the anonymous confessions channel
- **/confess** — Post an anonymous confession

## `customcommands.py` (3)

- **/customcommand-add** — Add or update a custom command.
- **/customcommand-remove** — Remove a custom command.
- **/customcommand-list** — List all custom commands in this server.

## `discharge.py` (5)

- **/discharge** — Discharge a member — strips rank/division roles, with a logged reason.
- **/discharges** — View a member's discharge history.
- **/discharge-channel** — Set the channel where discharges and desertions are logged.
- **/desertions** — Show recent desertions (members who left while ranked).
- **/backgroundcheck** — Pull together everything the bot knows about a member.

## `economy.py` (14)

- **/balance** — Check your (or someone's) balance
- **/daily** — Claim your daily pounds
- **/work** — Work for some pounds (1hr cooldown)
- **/pay** — Give pounds to another member
- **/pounds-leaderboard** — Top balances in this server
- **/shop-add** — [Admin] Add an item to the shop
- **/shop** — View the shop
- **/buy** — Buy an item from the shop
- **/inventory** — View your inventory
- **/rob** — Attempt to rob another member's wallet
- **/blackjack** — Play a hand of blackjack against the bot
- **/bounty-place** — Place a pound bounty on a member
- **/bounties** — View open bounties
- **/bounty-claim** — Claim a bounty (won via a game against the target, honor system)

## `economy_admin.py` (3)

- **/economy-set** — [Admin] Set a member's wallet balance directly
- **/economy-reset** — [Admin] Reset a member's balance and bank to zero
- **/networth** — See your (or someone's) total net worth (wallet + bank)

## `economy_bank.py` (4)

- **/deposit** — Move pounds from wallet to bank (safe from /rob)
- **/withdraw** — Move pounds from bank back to wallet
- **/crime** — Commit a crime for a bigger (riskier) payout than /work
- **/heist-start** — Start a multiplayer heist — others buy in, then it resolves

## `embeds.py` (2)

- **/embed** — Build and send a custom embed to a channel.
- **/say** — Make the bot say something in a channel (plain text).

## `events.py` (3)

- **/event-create** — Create an event with RSVP tracking.
- **/event-list** — Show upcoming events.
- **/event-attendance** — See who RSVP'd to an event.

## `fun2.py` (9)

- **/8ball** — Ask the magic 8-ball a question
- **/rps** — Play rock-paper-scissors against the bot
- **/trivia** — Answer a quick true/false trivia question
- **/wouldyourather** — Get a would-you-rather prompt
- **/guess-start** — Start a number guessing game (1-100)
- **/guess-try** — Guess the number from /guess-start
- **/joke** — Get a random joke
- **/fact** — Get a random fact
- **/ship** — Calculate compatibility between two members

## `giveaways.py` (2)

- **/giveaway-start** — Start a giveaway
- **/giveaway-reroll** — Reroll winners for an ended giveaway

## `groupops.py` (6)

- **/award** — Give a member an award/commendation.
- **/awards** — View a member's award history.
- **/awards-channel** — Set the channel where awards are announced.
- **/loa-request** — Request a leave of absence.
- **/loa-list** — List all currently approved leaves of absence.
- **/loa-channel** — Set the channel where LOA requests are sent for staff review.

## `honeypot.py` (2)

- **/sethoneypot** — [Admin] Set the honeypot trap channel
- **/honeypot-toggle** — [Admin] Toggle ban-on-trigger vs kick-on-trigger

## `invites.py` (2)

- **/invites** — See your (or someone's) invite count
- **/invite-leaderboard** — Top inviters in this server

## `leveling.py` (5)

- **/rank** — Show your (or another member's) level and XP.
- **/leaderboard** — Show the server's top members by XP.
- **/setlevelrole** — Set a role to be auto-granted at a specific level.
- **/removelevelrole** — Remove a level-role reward.
- **/levelup-channel** — Set the channel for level-up announcements.

## `logging_cog.py` (1)

- **/setserverlog** — Set the channel for general server activity logs (edits, deletes, etc.)

## `lottery.py` (2)

- **/lottery-buy** — *(no description)*
- **/lottery-draw** — [Admin] Draw the lottery winner and reset the pot

## `marriage.py` (3)

- **/marry** — Propose marriage to another member
- **/divorce** — End your marriage
- **/marriage-info** — Check a member's marriage status

## `moderation.py` (18)

- **/kick** — Kick a member from the server.
- **/ban** — Ban a member from the server.
- **/unban** — Unban a user by their user ID.
- **/timeout** — Timeout (mute) a member for a set duration.
- **/untimeout** — Remove a timeout from a member.
- **/warn** — Warn a member. Warnings are saved and can be reviewed later.
- **/warnings** — View all warnings for a member.
- **/clearwarnings** — Clear all warnings for a member.
- **/removewarning** — Remove a single warning by its ID.
- **/purge** — Delete a number of recent messages in this channel.
- **/lock** — Lock the current channel (prevent @everyone from sending messages).
- **/unlock** — Unlock the current channel.
- **/lockdown** — Lock every text channel in the server.
- **/slowmode** — Set slowmode delay for the current channel.
- **/nickname** — Change a member's nickname.
- **/addrole** — Add a role to a member.
- **/removerole** — Remove a role from a member.
- **/setmodlog** — Set the channel where moderation actions are logged.

## `moderation2.py` (5)

- **/muterole-setup** — [Admin] Create/configure a Muted role that blocks sending in all channels
- **/muterole-apply** — [Mod] Apply the Muted role to a member
- **/unbanid** — [Mod] Unban a user by their raw ID
- **/banlist** — [Mod] View currently banned users
- **/purgeuser** — [Mod] Delete a specific member's recent messages in this channel

## `modextra.py` (5)

- **/forcenick** — [Mod] Force-set a member's nickname
- **/resetnick** — [Mod] Reset a member's nickname to their username
- **/softban** — [Mod] Ban then immediately unban — purges recent messages without a permanent ban
- **/nuke** — [Admin] Instantly wipe this channel's message history (clone + delete)
- **/remindme** — Set a personal reminder

## `modmail.py` (3)

- **/modmail-setup** — [Admin] Configure ModMail category and log channel
- **/modmail-close** — [Mod] Close the modmail thread in this channel
- **/modmail-reply** — [Mod] Reply to the member in this modmail thread

## `northwind_duty.py` (7)

- **/duty-clockin** — Clock in for a duty/patrol shift
- **/duty-clockout** — Clock out of your current shift
- **/duty-hours** — View total logged duty hours for a member
- **/inspection** — Log a uniform/formation inspection result
- **/patrol-log** — Record a patrol report
- **/applications-channel** — [Admin] Set where applications get reviewed
- **/apply** — Submit a recruitment application

## `permissions.py` (4)

- **/permission-restrict** — Restrict a command to a specific role. Owner/Admins always retain access.
- **/permission-unrestrict** — Remove a role from a command's allowed list.
- **/permission-clear** — Remove ALL role restrictions from a command (opens it back up).
- **/permission-list** — Show role restrictions for one command, or all restricted commands.

## `petsystem.py` (5)

- **/pet-adopt** — Adopt a virtual pet
- **/pet-info** — View your pet's stats
- **/pet-feed** — Feed your pet
- **/pet-play** — Play with your pet
- **/pet-release** — Release your pet back into the wild

## `polls_multi.py` (1)

- **/poll-multi** — Create a multiple-choice poll (up to 5 options)

## `quotes.py` (4)

- **/quote-add** — Save a quote
- **/quote** — Get a random saved quote
- **/quotes-list** — List all saved quotes
- **/quote-delete** — [Admin] Delete a quote by ID

## `rankmanagement.py` (9)

- **/rank-add** — Add a rank to the hierarchy (or update it if it already exists).
- **/rank-remove** — Remove a rank from the hierarchy.
- **/rank-list** — Show the server's rank hierarchy.
- **/promote** — Promote a member to the next rank up.
- **/demote** — Demote a member to the next rank down.
- **/setrank** — Set a member directly to a specific rank.
- **/division-add** — Add a division (a non-hierarchical group, e.g. a squad or team).
- **/division-list** — List all configured divisions.
- **/transfer** — Transfer a member to a different division.

## `reactionroles.py` (2)

- **/reactionrole-add** — Link an emoji on a message to a role.
- **/reactionrole-remove** — Remove a reaction role link.

## `reminders.py` (1)

- **/remind** — Set a reminder. e.g. /remind 10m Check the oven

## `reputation.py` (3)

- **/rep-give** — Give another member a reputation point (once per day)
- **/rep-check** — Check a member's reputation
- **/rep-leaderboard** — Top reputation in this server

## `roblox.py` (4)

- **/verify** — Link your Roblox account to your Discord account.
- **/unverify** — Remove your (or another member's) Roblox verification.
- **/whois** — Look up a member's linked Roblox account.
- **/verified-role** — Set the role auto-granted when a member verifies.

## `roblox_extra.py` (2)

- **/roblox-groupinfo** — Look up a Roblox group by ID
- **/roblox-userinfo** — Look up a Roblox account by username

## `rpg_lite.py` (5)

- **/fish** — Go fishing for pounds
- **/hunt** — Go hunting for pounds
- **/mine** — Go mining for pounds
- **/craft** — Craft goods to sell for pounds
- **/adventure** — Go on a small adventure for pounds (highest risk/reward of the bunch)

## `scheduling.py` (2)

- **/schedule-message** — [Mod] Schedule a message to post in this channel after N minutes
- **/countdown** — Post a live countdown timer

## `security.py` (2)

- **/emergency-lockdown** — [Admin] Panic-lock the server: freezes all text channels + raises verification
- **/emergency-unlock** — [Admin] Reverse an active panic lockdown

## `selfroles.py` (3)

- **/selfrole-add** — [Admin] Add a role to the self-assignable list
- **/selfrole-remove** — [Admin] Remove a role from the self-assignable list
- **/selfrole-panel** — Post the self-role picker menu

## `servertools.py` (5)

- **/addemoji** — [Admin] Add an emoji from an image URL
- **/removeemoji** — [Admin] Remove a custom emoji
- **/categorycreate** — [Admin] Create a new channel category
- **/channelclone** — [Admin] Clone a channel (structure only, no messages)
- **/stickerlist** — List this server's custom stickers

## `snipe.py` (2)

- **/snipe** — Show the last deleted message in this channel
- **/editsnipe** — Show the last edited message in this channel

## `social.py` (5)

- **/hug** — Hug another member
- **/pat** — Pat another member
- **/slap** — Slap another member (playfully)
- **/highfive** — High-five another member
- **/compliment** — Give another member a compliment

## `socialalerts.py` (4)

- **/youtube-alert** — Get notified in a channel when a YouTube channel uploads.
- **/youtube-alert-remove** — Stop alerts for a YouTube channel.
- **/twitch-alert** — Get notified in a channel when a Twitch streamer goes live.
- **/twitch-alert-remove** — Stop alerts for a Twitch streamer.

## `starboard.py` (1)

- **/starboard-setup** — [Admin] Configure the starboard

## `suggestions.py` (3)

- **/suggestions-channel** — [Admin] Set the channel suggestions get posted to
- **/suggest** — Submit a suggestion
- **/suggestion-status** — [Admin] Mark a suggestion approved/denied/pending

## `tags.py` (4)

- **/tag-create** — Create or update a tag
- **/tag** — Show a saved tag
- **/tag-delete** — [Mod] Delete a tag
- **/tag-list** — List all tags in this server

## `temproles.py` (1)

- **/temprole** — [Mod] Give a member a role that expires automatically

## `textutils.py` (4)

- **/choose** — Pick a random item from a comma-separated list
- **/reversetext** — Reverse a string of text
- **/mocktext** — Convert text to sPoNgEbOb CaSe
- **/randomcolor** — Generate a random hex color

## `tickets.py` (6)

- **/ticket-setup** — Configure the ticket system for this server.
- **/ticket-panel** — Post the ticket creation panel in this channel.
- **/ticket-add** — Add a member to the current ticket.
- **/ticket-remove** — Remove a member from the current ticket.
- **/ticket-priority** — Change the priority of the current ticket.
- **/ticket-close** — Close the current ticket.

## `utility.py` (6)

- **/ping** — Check the bot's latency.
- **/credits** — See who made this bot.
- **/serverinfo** — Show information about this server.
- **/userinfo** — Show information about a member.
- **/avatar** — Get a member's avatar.
- **/help** — List all available commands.

## `utility_extra.py` (9)

- **/banner** — View a member's banner (if they have one)
- **/timestamp** — Convert minutes-from-now into a Discord timestamp tag
- **/calculate** — Evaluate a basic math expression
- **/charcount** — Count characters/words in a block of text
- **/membercount** — Show member/bot/human counts for this server
- **/rolecount** — Show how many members have a given role
- **/uptime** — Show how long the bot has been running
- **/servericon** — Get this server's icon at full resolution
- **/channelinfo** — Show info about a channel

## `verification.py` (1)

- **/verify-setup** — [Admin] Post the verification panel and set the verified role

## `welcome.py` (4)

- **/welcome-setup** — Set the channel and message for welcome announcements.
- **/goodbye-setup** — Set the channel and message for goodbye announcements.
- **/welcome-dm** — Toggle sending a DM to new members when they join.
- **/goodbye-dm** — Toggle sending a DM to members when they leave.

## `wordfilter.py` (3)

- **/blacklist-add** — [Admin] Add a word to the blacklist
- **/blacklist-remove** — [Admin] Remove a word from the blacklist
- **/blacklist-list** — [Admin] View the word blacklist