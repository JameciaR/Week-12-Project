class GroceryItem {
    constructor(name) {
        this.name = name;
        this.details = [];
    }
}

class Detail {
    constructor(name) {
        this.name = name;
    }
}

class GroceryService {
    static groceryItems = [];

    static getAllGroceryItems() {
      return this.GroceryItems;
    }

    static getGroceryItem(id) {
      return this.GroceryItems[id];
    }

    static createGroceryItem(groceryItem) {
      return this.groceryItems.push(groceryItem);
    }

    static updategroceryItem(id, newGroceryItem) {
      return this.groceryItems[id] = newGroceryItem;
    }

    static deleteGroceryItem(id) {
      return this.groceryItems.splice(id, 1);
    }
}

class DOMManager {
    static groceryItems;

    static getGroceryItems() {
      this.render(GroceryService.getAllGroceryItems());
    }

    static createGroceryItem(name) {
      ToDoService.createGroceryItem(new GroceryItem(name));
      this.render(GroceryService.getAllGroceryItems());
    }

    static deleteGroceryItem(id) {
      ToDoService.deleteGroceryItem(id);
      this.render(GroceryService.getAllGroceryItems());
    }

    static addDetail(id) {
      for (let groceryItem of this.groceryItems) {
        if (this.groceryItems.indexOf(groceryItem) == id) {
          groceryItem.details.push(new Detail($(`#${this.groceryItems.indexOf(groceryItem)}-detail-name`).val()));
          GroceryService.updateGroceryItem(id, groceryItem);
          this.render(GroceryService.getAllGroceryItems());
        }
      }
    }

    static deleteDetail(groceryItemID, detailID) {
      for (let groceryItem of this.groceryItems) {
              if (this.groceryItems.indexOf(groceryItem) == groceryItemID) {
                for (let detail of groceryItem.details) {
                  if (groceryItem.details.indexOf(detail) == detailID) {
                    groceryItem.details.splice(groceryItem.details.indexOf(detail), 1);
                    GroceryService.updateGroceryItem(groceryItemID, GroceryItem);
                    this.render(GroceryService.getAllGroceryItems());
                  }
                }
              }
          }
    }

    static render(groceryItems) {
        this.groceryItems = groceryItems;
        $('#grocery-items').empty();
        for (let groceryItem of this.groceryItems) {
            $('#grocery-items').prepend(
                `<div id="${this.groceryItems.indexOf(groceryItem)}" class="card">
                    <div class="card-header">
                    <h2>${groceryItem.name}</h2>
                    <button class="btn btn-danger" onclick="DOMManager.deleteGroceryItem('${this.groceryItems.indexOf(groceryItem)}')">Delete</button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${this.groceryItems.indexOf(groceryItem)}-detail-name" class="form-control" placeholder="Details">
                                </div>
                                <button id="${this.groceryItems.indexOf(groceryItem)}-new-detail" onclick="DOMManager.addDetail('${this.groceryItems.indexOf(groceryItem)}')" class="btn btn-primary form-control">Add Detail</button>
                            </div>
                         </div>
                    </div>
                </div><br>`
            );
            for (let detail of groceryItem.details) {
                $(`#${this.groceryItems.indexOf(groceryItem)}`).find('.card-body').append(
                    `<p>
                      <span id="name-${GroceryItem.details.indexOf(detail)}"><strong>Detail:</strong> ${detail.name}</span> - 
                      <button class="btn btn-danger" onclick="DOMManager.deleteDetail('${this.GroceryItems.indexOf(groceryItem)}','${groceryItem.details.indexOf(detail)}')">Delete Detail</button>
                    </p>`
                );
            }
        }
    }
}

$('#create-new-grocery-item').click(() => {
    DOMManager.createGroceryItem($('#new-grocery-item').val());
    $('#new-grocery-item').val('');
});

DOMManager.getAllGroceryItems();