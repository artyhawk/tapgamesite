export interface User {
  id: number;
  first_name: string;
  last_name: string;
  city: string | null;
}

export interface TeamUser {
  user: User;
  number: string;
}

export interface City {
  id: number;
  name: string;
  name_en: string;
  country: string;
}

export interface Team {
  id: number;
  name: string;
  city: City;
  logo: string | null;
}

export interface TournamentTeam {
  id: number;
  name: string;
  team: Team;
}

export interface PlayerData {
  id: number;
  tournament_team: TournamentTeam;
  team_user: TeamUser;
}

export interface TournamentTeamStats {
  id: number;
  team: {
    id: number;
    name: string;
    city: {
      name: string;
    };
    logo: string | null;
  };
  games_count: number;
  won_games_count: number;
  lose_games_count: number;
  won_games_percent: number;
  plus_minus: string;
}
