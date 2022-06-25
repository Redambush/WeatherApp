export class Station {
  ID: string
  Name: string;
  Owner: string;
  Location: string;
  Actions: string;

  constructor(ID: string, Name: string, Owner: string, Location: string, Actions: string) {
    this.ID = ID;
    this.Name = Name;
    this.Owner = Owner;
    this.Location = Location;
    this.Actions = Actions;
  }
}
