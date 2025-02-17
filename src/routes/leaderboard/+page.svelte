<script>
	import { Question } from 'phosphor-svelte';
	import X from 'phosphor-svelte/lib/X';

	export let data;

	let pp_sort = data.users.slice();
	pp_sort.sort((x, y) => y.points - x.points);

	let reviews_sort = data.users.slice();
	reviews_sort.sort((x, y) => y.num_reviews - x.num_reviews);

	let status_sort = data.users.slice();
	status_sort.sort((x, y) => y.status_updates - x.status_updates);

	let quests_sort = data.users.slice();
	quests_sort.sort((x, y) => y.quests_completed - x.quests_completed);

	let friends_sort = data.users.slice();
	friends_sort.sort((x, y) => y.friends_invited - x.friends_invited);

	let locations_sort = data.users.slice();
	locations_sort.sort((x, y) => y.locations_marked - x.locations_marked);
</script>

<svelte:head>
	<title>leaderboards</title>
</svelte:head>

<div class="content">
	<div class="top">
		<a href="/"><X size="1.5rem" /></a>
	</div>
	<h1>Leaderboards</h1>
	<div class="leaderboards">
		<div class="bar">
			<h2 style="font-size: 2.5rem;">Seasonal Leaderboards</h2>
			<p>Time Left This Season Before Reset: 00d 00h 00m 00s</p>
		</div>
		<div class="line">
			<div class="leaderboard">
				<h2>Most PinPoints Earned</h2>
				<p>Prize: Title "Y1 Spring - Avid PinPoint Collector"</p>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Pinpoints</th>
						</tr>
					</thead>
					<tbody>
						{#each pp_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.points}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="leaderboard">
				<h2>Most Locations Reviewed</h2>
				<p>Prize: Title "Y1 Spring - The Outspoken One"</p>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
					<tbody>
						{#each reviews_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.num_reviews}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="leaderboard">
				<h2>Most Statuses Updated</h2>
				<p>Prize: Title "Y1 Spring - Upkeep King"</p>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Updates</th>
						</tr>
					</thead>
					<tbody>
						{#each status_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.status_updates}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<!-- <div class="line">
			<div class="leaderboard">
				<h2>Most Dis/Approvals Given</h2>
				<p>Prize: Title "Y1 Spring - A Redditor?"</p>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="leaderboard">
				<h2>Most Approvals Received</h2>
				<p>Prize: Title "Y1 Spring - Acclaimed Critic"</p>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="leaderboard">
				<h2>Most Disapprovals Received</h2>
				<p>Prize: Season ban from ability to review</p>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
				</table>
			</div>
		</div> -->

		<div class="bar">
			<h2 style="font-size: 2.5rem;">Lifetime Leaderboards</h2>
			<p>No resets, no prizes (except bragging rights)</p>
		</div>
		<div class="line">
			<div class="leaderboard">
				<h2 style="margin-bottom: 1rem;">Most PinPoints Earned</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Pinpoints</th>
						</tr>
					</thead>
					<tbody>
						{#each pp_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.points}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="leaderboard">
				<h2 style="margin-bottom: 1rem;">Most Verified Locations Marked</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
					<tbody>
						{#each locations_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.locations_marked}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="leaderboard">
				<h2 style="margin-bottom: 1rem;">Most Weekly Quests Completed</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Quests</th>
						</tr>
					</thead>
					<tbody>
						{#each quests_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.quests_completed}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<div class="line">
			<div class="leaderboard">
				<h2 style="margin-bottom:1rem;">Most Locations Reviewed</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
					<tbody>
						{#each reviews_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.num_reviews}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="leaderboard">
				<h2 style="margin-bottom:1rem;">Most Statuses Updated</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Updates</th>
						</tr>
					</thead>
					<tbody>
						{#each status_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.status_updates}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="leaderboard">
				<h2 style="margin-bottom:1rem;">Most Friends Invited</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Friends</th>
						</tr>
					</thead>
					<tbody>
						{#each friends_sort as user, i}
							<tr>
								<td>{i + 1}</td>
								<td>
									<div class="user">
										<img src={user.avatar_url} alt={user.name} />{user.name}
									</div>
								</td>
								<td>{user.friends_invited}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<!-- <div class="line">
			<div class="leaderboard">
				<h2 style="margin-bottom:1rem;">Most Dis/Approvals Given</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="leaderboard">
				<h2 style="margin-bottom:1rem;">Most Approvals Received</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="leaderboard">
				<h2 style="margin-bottom:1rem;">Most Disapprovals Received</h2>
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Username</th>
							<th>Locations</th>
						</tr>
					</thead>
				</table>
			</div>
		</div> -->
	</div>
</div>

<style>
	.content {
		padding: 2rem;
		position: relative;
	}
	.top {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	h1 {
		margin: 1rem 0;
		font-size: 3rem;
	}
	h2,
	p {
		margin: 0;
	}
	.bar {
		background-color: var(--bg-2);
		/* width: 96%; */
		margin: 1rem 0rem;
		border-radius: 1rem;
		padding: 2rem;
		border: 2px solid var(--bg-2);
	}
	.leaderboards {
		overflow: auto;
		height: 68vh;
	}
	.line {
		padding: 1rem 0rem;
		display: flex;
		gap: 2rem;
	}
	.leaderboard {
		height: 24rem;
		overflow: auto;
		flex: 32%;
		padding: 2rem;
		background-color: var(--bg-2);
		border-radius: 1rem;
		border: 2px solid var(--bg-2);
	}
	table {
		padding-top: 1rem;
		width: 100%;
		text-align: left;
	}
	table,
	th,
	td {
	}

	.user {
		display: flex;
		align-items: center;
	}

	img {
		border-radius: 9999px;
		height: 2rem;
		width: 2rem;
		margin-right: 0.5rem;
	}
	th,
	td {
		/* display: inline-flex; */
		align-items: center;
		padding: 0.5rem 0.25rem;
	}

	::-webkit-scrollbar {
		width: 0.5rem;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}
	::-webkit-scrollbar-thumb {
		background-color: #aaaaaa;
		border-radius: 1vh;
		transition: 0.2s;
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: var(--red);
	}
</style>
