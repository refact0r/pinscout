<script>
	import { userState } from '$lib/state.svelte';
	import { onMount } from 'svelte';
	import X from 'phosphor-svelte/lib/X';

	import { WarningCircle, Question } from 'phosphor-svelte';

	let greeting;

	onMount(() => {
		var now = new Date();
		const hours = now.getHours();
		if (hours < 2) {
			greeting = 'night';
		} else if (hours < 12) {
			greeting = 'morning';
		} else if (hours < 19) {
			greeting = 'afternoon';
		} else if (hours < 22) {
			greeting = 'evening';
		} else {
			greeting = 'night';
		}
	});
</script>

<svelte:head>
	<title>dashboard</title>
</svelte:head>

<div class="content">
	<div class="top">
		<a href="/"><X size="1.5rem" /></a>
	</div>
	<h1>Your Dashboard</h1>
	<p class="greeting">Good {greeting}, {userState.user?.name}.</p>
	<br />
	<div class="dashboard">
		<div class="stats">
			<h2>
				Available Quests <Question /> :
				<div class="right">3</div>
			</h2>
			<div class="scrollbar">
				<div class="substats">
					<h3 class="quest">
						Weekly Quest 1: Weekly Upkeep
						<div class="right"><WarningCircle /></div>
					</h3>
					<h3 class="taut">
						Visit a pinned location and update its status.
						<div class="right"></div>
					</h3>
					<h3 class="taut">
						↪ PinPoint Reward: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Progress: <div class="right">0%</div>
					</h3>
					<h3 class="quest">
						Weekly Quest 2: Thought-Provoking
						<div class="right"><WarningCircle /></div>
					</h3>
					<h3 class="taut">
						Leave a review on two different pinned locations.
						<div class="right"></div>
					</h3>
					<h3 class="taut">
						↪ PinPoint Reward: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Progress: <div class="right">0%</div>
					</h3>
					<h3 class="quest">
						Weekly Quest 3: I, Moderator
						<div class="right"><WarningCircle /></div>
					</h3>
					<h3 class="taut">
						Leave an approval or dissapproval for three reviews from different locations.
						<div class="right"></div>
					</h3>
					<h3 class="taut">
						↪ PinPoint Reward: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Progress: <div class="right">0%</div>
					</h3>
					<h3 class="quest">
						Lifetime Quest 1: The More the Merrier
						<div class="right"><WarningCircle /></div>
					</h3>
					<h3 class="taut">
						Invite a friend with a referral code. <Question />
						<div class="right"></div>
					</h3>
					<h3 class="taut">
						↪ PinPoint Reward: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Status: <div class="right">Ongoing</div>
					</h3>
				</div>
			</div>
		</div>
		<div class="stats">
			<h2>
				Total PinPoints <Question /> :
				<div class="right">{userState.user?.points}</div>
			</h2>
			<div class="scrollbar">
				<div class="substats">
					<h3>
						Ranking: <div class="right">#1</div>
					</h3>
					<h3>PinPoints Gained:</h3>
					<h3 class="taut">
						↪ Past Week: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Past Month: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Past Year: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3>
						Lifetime PinPoints Gained: <div class="right">{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ From Quests: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ From Location-Marking: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ From Reviews: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ From Approvals/Disapprovals Given: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ From Approvals Received: <div class="right">+{userState.user?.points}</div>
					</h3>
				</div>
			</div>
		</div>
		<div class="stats">
			<h2>
				Total Activity: <div class="right">{userState.user?.points}</div>
			</h2>
			<div class="scrollbar">
				<div class="substats">
					<h3>
						Ranking: <div class="right">#1</div>
					</h3>
					<h3>
						Total Quests Completed: <div class="right">{userState.user?.quests_completed}</div>
					</h3>
					<h3 class="taut">
						↪ Ranking: <div class="right">#1</div>
					</h3>
					<h3 class="taut">
						↪ Past Month: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Past Year: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3>
						Total Verified Locations Marked: <div class="right">
							{userState.user?.locations_marked}
						</div>
					</h3>
					<h3 class="taut">
						↪ Ranking: <div class="right">#1</div>
					</h3>
					<h3 class="taut">
						↪ Past Month: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Past Year: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3>
						Total Reviews Left: <div class="right">{userState.user?.num_reviews}</div>
					</h3>
					<h3 class="taut">
						↪ Ranking: <div class="right">#1</div>
					</h3>
					<h3 class="taut">
						↪ Past Month: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Past Year: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3>
						Total Approvals/Disapprovals Given: <div class="right">{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Ranking: <div class="right">#1</div>
					</h3>
					<h3 class="taut">
						↪ Past Month: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Past Year: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3>
						Total Approvals/Disapprovals Received: <div class="right">{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Ranking: <div class="right">#1</div>
					</h3>
					<h3 class="taut">
						↪ Past Month: <div class="right">+{userState.user?.points}</div>
					</h3>
					<h3 class="taut">
						↪ Past Year: <div class="right">+{userState.user?.points}</div>
					</h3>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.top {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	.content {
		padding: 2rem;
		position: relative;
	}
	h1 {
		margin: 1rem 0;
		font-size: 3rem;
	}
	h2 {
		font-size: 2rem;
		align-items: center;
	}
	h3 {
		font-weight: 400;
	}
	.quest {
		font-weight: 700;
	}
	.dashboard {
		display: flex;
		gap: 2%;
	}
	.stats {
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 1vw;
		padding: 2vh 2vw;
		flex: 32%;
		text-align: left;
		height: 56vh;
	}
	.scrollbar {
		margin-top: -1rem;
		margin-right: -1.25rem;
		height: 40vh;
		overflow: auto;
	}
	.substats {
		padding-right: 0.75rem;
	}
	.taut {
		margin-top: -1rem;
	}
	.right {
		float: right;
	}
	.greeting {
		font-size: 1.5rem;
		margin: 1rem 0rem;
	}

	::-webkit-scrollbar {
		width: 0.5rem;
	}
	::-webkit-scrollbar-track {
		background: rgb(0, 0, 0, 0);
	}
	::-webkit-scrollbar-thumb {
		background-color: black;
		border-radius: 1vh;
		transition: 0.2s;
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: rgb(234, 72, 78);
	}
</style>
