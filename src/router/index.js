import { createRouter, createWebHistory } from 'vue-router'
import TeamsMembers from '../components/teams/TeamMembers.vue'
import TeamsFooter from '../components/teams/TeamsFooter.vue'
import TeamsList from '../components/teams/TeamsList.vue'
import UsersFooter from '../components/users/UsersFooter.vue'
import UsersList from '../components/users/UsersList.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/teams' },
		{
			name: 'teams',
			path: '/teams',
			components: {
				default: TeamsList,
				footer: TeamsFooter,
			},
			children: [
				{
					name: 'team-members',
					path: ':teamId',
					component: TeamsMembers,
					props: true,
				},
			],
		},
		{
			path: '/users',
			components: {
				default: UsersList,
				footer: UsersFooter,
			},
		},
		{ path: '/:catchAll(.*)', redirect: '/teams' },
	],
	scrollBehavior(to, from, savedPosition) {
		console.log(to, from, savedPosition)
		if (savedPosition) {
			return savedPosition
		}
		return { left: 0, top: 0 }
	},
})

export default router
