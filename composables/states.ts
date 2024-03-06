import type { UserDTO } from '~/types'

export const useUser = () => useState<UserDTO | null>('user', () => null)
