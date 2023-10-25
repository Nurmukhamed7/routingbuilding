import { createRouter, createWebHistory } from 'vue-router'
import TeamsMembers from '../components/teams/TeamMembers.vue'
import TeamsList from '../components/teams/TeamsList.vue'
import UsersList from '../components/users/UsersList.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', redirect: '/teams' },
		{
			path: '/teams',
			component: TeamsList,
			children: [{ path: ':teamId', component: TeamsMembers, props: true }],
		},
		{ path: '/users', component: UsersList },
		{ path: '/:catchAll(.*)', redirect: '/teams' },
	],
})

export default router
