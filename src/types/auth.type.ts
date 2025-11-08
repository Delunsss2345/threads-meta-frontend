interface CurrentUser {
  email?: string;
  id?: string;
  name?: string;
}

export type InitStateAuth = {
  currentUser: CurrentUser | null;
  fetching: boolean;
};
