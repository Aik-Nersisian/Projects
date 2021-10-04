import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { IonContent, Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class SqlStorageService {
  databaseObj: SQLiteObject;
  readonly database_name: string = 'Pexel_Lite4.db';
  readonly table_name: string = 'Pexel_Lite4';
  name_model: string = '';
  row_data: any = [];
  updateActive: boolean;
  to_update_item: any;

  constructor(private sqlite: SQLite) {}

  createDB() {
    console.log('creating database');
    this.sqlite
      .create({
        name: this.database_name,
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        this.createTable();
      })
      .catch((e) => {
        console.log('error ' + JSON.stringify(e));
      });
  }

  // id: string;
  // name: string;
  // width: number;
  // height: number;
  // url: string;
  // photographer: string;
  // photographer_url: string;
  // photographer_id: number;
  // avg_color: string;
  // src: string;

  createTable() {
    this.databaseObj
      .executeSql(
        `CREATE TABLE IF NOT EXISTS ${this.table_name}  (pid INTEGER PRIMARY KEY AUTOINCREMENT,
        id varchar(255),
        name varchar(255),
        photographer varchar(255),
        photographer_url varchar(255),
        src varchar(255),
        liked boolean,
        height INTEGER,
        width INTEGER,
        avg_color varchar(255))`,
        []
      )
      .then(() => {
        console.log('Table Created!');
      })
      .catch((e) => {
        console.log('error ' + JSON.stringify(e));
      });
  }

  //Inset row in the table
  insertRow(
    id,
    name,
    photographer,
    photographer_url,
    src,
    liked,
    height,
    width,
    avg_color
  ) {
    // Value should not be empty
    if (photographer.length == 0) {
      console.log('Empty');
      return;
    }

    console.log(id, name, photographer, photographer_url, src);

    this.databaseObj
      .executeSql(
        `INSERT INTO ${this.table_name} (id,name, photographer, photographer_url, src, liked, height, width, avg_color) VALUES  ('${id}','${name}','${photographer}','${photographer_url}','${src}','${liked}','${height}','${width}','${avg_color}')`,
        []
      )
      .then(() => {
        console.log('Row Inserted!');
      })
      .catch((e) => {
        console.log('error ' + JSON.stringify(e));
      });
  }

  // Retrieve rows from table
  async getRows() {
    return await new Promise((resolve, reject) => {
      if (this.databaseObj) {
        this.databaseObj
          .executeSql(`SELECT * FROM ${this.table_name}`, [])
          .then(
            (res) => {
              let row_data = [];
              if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                  row_data.push(res.rows.item(i));
                }
              }
              resolve(row_data);
            },
            (error) => {
              reject(error);
            }
          );
      }
    });
  }

  // Delete single row
  deleteRow(item) {
    console.log(item);
    this.databaseObj
      .executeSql(
        `
      DELETE FROM ${this.table_name} WHERE pid = ${item.pid}
    `,
        []
      )
      .then((res) => {
        console.log('Row Deleted!');
      })
      .catch((e) => {
        console.log('trying to delete');
        console.log('error ' + JSON.stringify(e));
      });
  }

  // Enable update mode and keep row data in a variable
  enableUpdate(item) {
    this.updateActive = true;
    this.to_update_item = item;
    this.name_model = item.Name;
  }

  // Update row with saved row id
  updateRow() {
    this.databaseObj
      .executeSql(
        `
      UPDATE ${this.table_name}
      SET Name = '${this.name_model}'
      WHERE pid = ${this.to_update_item.pid}
    `,
        []
      )
      .then(() => {
        console.log('Row Updated!');
        this.updateActive = false;
      })
      .catch((e) => {
        console.log('error ' + JSON.stringify(e));
      });
  }

  async getRowss() {
    return await new Promise((resolve) => {});
  }
}
