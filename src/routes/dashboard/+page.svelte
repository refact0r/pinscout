<script>
	import { userState } from '$lib/state.svelte';
	import { onMount } from 'svelte';
	import X from 'phosphor-svelte/lib/X';

	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	import Question from 'phosphor-svelte/lib/Question';
	import ArrowSquareOut from 'phosphor-svelte/lib/ArrowSquareOut';

	let greeting;
	let dashboard;

	let quests_popup;
	let pp_popup;
	let x;
	let y;

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

	function getThumbPosition(element) {
		const scrollPosition = element.scrollTop; // Get current scroll position
		const scrollHeight = element.scrollHeight; // Get total scrollable height
		const barHeight = element.clientHeight; // Get visible height of the scrollbar
		// Calculate thumb position as a percentage of the bar
		const thumbPositionPercentage = (scrollPosition / (scrollHeight - barHeight)) * 100;
		return thumbPositionPercentage;
		/*
		if (thumbPositionPercentage == 0) {
			return 0.01;
		}else {
			return thumbPositionPercentage;
		}*/
	}

	function popup(show, what, mx, my) {
		let thumb_pos = getThumbPosition(dashboard);
		if (what === 'quests') {
			quests_popup = show;
			if (thumb_pos < 8) {
				y = my * (0.15 - thumb_pos / 50);
			} else {
				y = my * (0.95 - thumb_pos / 70);
			}
		} else if (what === 'pp') {
			pp_popup = show;
			if (thumb_pos < 8) {
				y = my * (0.3 - thumb_pos / 50);
			} else {
				y = my * (0.95 - thumb_pos / 70);
			}
		}

		x = mx;

		//console.log(getThumbPosition(dashboard));
	}
</script>

<svelte:head>
	<title>dashboard</title>
</svelte:head>

<div class="content">
	<div class="top">
		<a href="/"><X size="1.5rem" /></a>
	</div>
	<h1>Your Dashboard</h1>
	<br />
	<div class="dashboard" bind:this={dashboard}>
		<p class="greeting">Good {greeting}, {userState.user?.name}.</p>
		<div class="line">
			<div class="stats">
				{#if quests_popup}
					<div class="popuptext" style="position:absolute; left:{x * 0.65}px; top: {y}px;">
						<span
							>Quests are tasks given to users to help improve pinscout's services in exchange for
							PinPoints. Weekly quests have a cooldown after completion and refresh every week,
							while lifetime quests have no cooldown and can be completed infinitely.</span
						>
					</div>
				{/if}
				<h2>
					Available Quests
					<div
						class="popup"
						on:mouseenter={(event) =>
							popup(
								true,
								'quests',
								event.srcElement.getBoundingClientRect().left,
								event.srcElement.getBoundingClientRect().top
							)}
						on:mouseleave={() => popup(false, 'quests')}
					>
						<Question />
					</div>
					:
					<div class="right">4</div>
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
							↪ PinPoint Reward: <div class="right">+10</div>
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
							↪ PinPoint Reward: <div class="right">+10</div>
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
							↪ PinPoint Reward: <div class="right">+10</div>
						</h3>
						<h3 class="taut">
							↪ Progress: <div class="right">0%</div>
						</h3>
						<h3 class="quest">
							Lifetime Quest 1: The More the Merrier
							<div class="right"><WarningCircle /></div>
						</h3>
						<h3 class="taut">
							Invite a friend with an invite code. <Question />
							<div class="right"></div>
						</h3>
						<h3 class="taut">
							↪ PinPoint Reward: <div class="right">+50</div>
						</h3>
						<h3 class="taut">
							↪ Status: <div class="right">Ongoing</div>
						</h3>
					</div>
				</div>
			</div>
			<div class="stats">
				{#if pp_popup}
					<div class="popuptext" style="position:absolute; left:{x * 0.85}px; top: {y}px;">
						<span
							>PinPoints are a form of digital currency that is given as a reward to users who
							contribute to the pinscout platform. PinPoints can be spent in the shop.</span
						>
					</div>
				{/if}
				<h2>
					Total PinPoints
					<div
						class="popup"
						on:mouseenter={(event) =>
							popup(
								true,
								'pp',
								event.srcElement.getBoundingClientRect().left,
								event.srcElement.getBoundingClientRect().top
							)}
						on:mouseleave={() => popup(false, 'pp')}
					>
						<Question />
					</div>
					:
					<div class="right">{userState.user?.points}</div>
				</h2>
				<div class="scrollbar">
					<div class="substats">
						<h3>Spend your PinPoints here: <a href="/shop">shop<ArrowSquareOut /></a></h3>
						<h3>PinPoints Gained:</h3>
						<h3 class="taut">
							↪ Past Week: <div class="right">+{userState.user?.points}</div>
						</h3>
						<h3 class="taut">
							↪ Past Month: <div class="right">+{userState.user?.points}</div>
						</h3>
						<h3 class="taut">
							↪ This Season: <div class="right">+{userState.user?.points}</div>
						</h3>
						<h3 class="taut">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↪ Ranking: <div class="right">#1</div>
						</h3>
						<h3>
							Lifetime PinPoints Gained: <div class="right">{userState.user?.points}</div>
						</h3>
						<h3 class="taut">
							↪ Ranking: <div class="right">#1</div>
						</h3>
						<h3 class="taut">
							↪ From Quests: <div class="right">+{userState.user?.points}</div>
						</h3>
						<h3 class="taut">
							↪ From Location-Marking: <div class="right">+{userState.user?.points}</div>
						</h3>
						<h3 class="taut">
							↪ From Status Updates: <div class="right">+{userState.user?.points}</div>
						</h3>
						<h3 class="taut">
							↪ From Reviews: <div class="right">+{userState.user?.points}</div>
						</h3>
						<!--<h3 class="taut">↪ From Approvals/Disapprovals Given: <div class="right">+{userState.user?.points}</div></h3>
						<h3 class="taut">↪ From Approvals Received: <div class="right">+{userState.user?.points}</div></h3>-->
						<h3 class="taut">
							↪ From Friends Invited: <div class="right">+{userState.user?.points}</div>
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
							Total Quests Completed: <div class="right">{userState.user?.quests_completed}</div>
						</h3>
						<h3 class="taut">
							↪ Ranking: <div class="right">#1</div>
						</h3>
						<h3>
							Total Verified Locations Marked: <div class="right">
								{userState.user?.locations_marked}
							</div>
						</h3>
						<h3 class="taut">
							↪ Ranking: <div class="right">#1</div>
						</h3>
						<h3>
							Total Reviews Left: <div class="right">{userState.user?.num_reviews}</div>
						</h3>
						<h3 class="taut">
							↪ Ranking: <div class="right">#1</div>
						</h3>
						<h3 class="taut">
							↪ This Season: <div class="right">+{userState.user?.num_reviews}</div>
						</h3>
						<h3 class="taut">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↪ Ranking: <div class="right">#1</div>
						</h3>
						<h3>
							Total Statuses Updated: <div class="right">{userState.user?.status_updates}</div>
						</h3>
						<h3 class="taut">
							↪ Ranking: <div class="right">#1</div>
						</h3>
						<h3 class="taut">
							↪ This Season: <div class="right">+{userState.user?.status_updates}</div>
						</h3>
						<h3 class="taut">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↪ Ranking: <div class="right">#1</div>
						</h3>
						<!--<h3>Total Approvals Given: <div class="right">{userState.user?.points}</div></h3>
						<h3>Total Disapprovals Given: <div class="right">{userState.user?.points}</div></h3>
						<h3>Total Approvals Received: <div class="right">{userState.user?.points}</div></h3>
						<h3>Total Disapprovals Received: <div class="right">{userState.user?.points}</div></h3>-->
						<h3>
							Friends Invited: <div class="right">{userState.user?.friends_invited}</div>
						</h3>
						<h3 class="taut">
							↪ Ranking: <div class="right">#1</div>
						</h3>
					</div>
				</div>
			</div>
		</div>

		<br />
		<h2>User Account</h2>
		<div class="line">
			<div class="stats">
				<h2>Your Profile</h2>
				<div class="scrollbar">
					<div class="substats">
						<div class="user-block">
							<div class="user-block-avatar">
								<h3 style="margin-bottom:0.5rem;">Avatar</h3>
								<img src={userState.user?.avatar_url} alt="" />
							</div>
							<div class="user-block-info">
								<div class="vertical-center" style="margin-top: auto; margin-bottom:auto;">
									<br /><br />
									<h3>Username: {userState.user?.name}</h3>
									<h3>Account Created: _date_</h3>
								</div>
							</div>
						</div>
						<h3 style="margin-bottom:0.5rem;"><label for="title">Title:</label></h3>
						<select id="titles" name="titles">
							<option value="title1">Average pinscout Enjoyer</option>
							<option value="title2">PinPoint Pioneer</option>
						</select>
					</div>
				</div>
			</div>
			<div class="activities">
				<h2>Most Recent Activities</h2>
				<div class="scrollbar">
					<div class="substats">
						<br />
						<div class="activity">
							<h3>placeholder activity</h3>
							<!--Put in top 5 most recent activity (status update, new location marked, approve/disapprove, reviews, etc)-->
						</div>
						<br />
						<div class="activity">
							<h3>placeholder activity</h3>
						</div>
						<br />
						<div class="activity">
							<h3>placeholder activity</h3>
						</div>
						<br />
						<div class="activity">
							<h3>placeholder activity</h3>
						</div>
						<br />
						<div class="activity">
							<h3>placeholder activity</h3>
						</div>
					</div>
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
		margin-top: 0.5rem;
	}
	h3 {
		font-weight: 400;
	}
	.quest {
		font-weight: 700;
	}
	.dashboard {
		height: 66vh;
		overflow: auto;
	}
	.line {
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
	.activities {
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 1vw;
		padding: 2vh 2vw;
		flex: 66%;
		text-align: left;
		height: 56vh;
	}
	.activity {
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 1vw;
		padding: 1vh 1vw;
	}
	.user-block {
		display: flex;
		gap: 6%;
		height: 20vh;
	}
	.user-block-avatar {
		flex: 30%;
		text-align: center;
		align-items: center;
	}
	.user-block-info {
		flex: 64%;
	}
	.scrollbar {
		margin-top: -1rem;
		margin-right: -1.25rem;
		height: 42vh;
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
		margin: 0rem 0rem 1rem;
	}
	a {
		color: black;
		text-decoration: none;
		transition: 0.2s;
	}
	a:hover {
		color: rgb(234, 72, 78);
	}
	#titles {
		height: 2.5rem;
		width: 100%;
		border: none;
		border-radius: 0.5rem;
		padding: 0 0.5rem;
		font-family: 'Urbanist', serif;
		font-size: 1rem;
	}
	option {
		font-family: 'Urbanist', serif;
	}
	.popup {
		display: inline-block;
		cursor: pointer;
	}
	.popuptext {
		display: absolute;
		z-index: 5;
		top: 10%;
		left: 10%;
		font-size: 0.8rem;
		font-weight: 500;
		text-align: center;
		width: 14rem;
		background-color: rgba(255, 255, 255, 0.75);
		backdrop-filter: blur(0.75rem);
		padding: 0.5rem;
		border-radius: 1rem;
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
