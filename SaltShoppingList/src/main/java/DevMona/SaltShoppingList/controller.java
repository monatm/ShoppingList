package DevMona.SaltShoppingList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/Buy")
@CrossOrigin("*")
public class controller {

    @Autowired
    private ShoppingService service;

    @PostMapping("/add")
    public ResponseEntity<String> createShopping(@RequestBody Shopping shopping) {
        try {
            Shopping savedlist = service.save(shopping);
            return ResponseEntity.ok(savedlist.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add item");
        }
    }
    

    @DeleteMapping("/{title}")
    public ResponseEntity<String> deleteItemByTitle(@PathVariable String title) {
        try {
            Optional<Shopping> listOptional =service.findByTitle(title);
            if (listOptional.isPresent()) {
                service.deleteById(listOptional.get().getId());
                return ResponseEntity.ok("Item deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete Item ");
        }
    }

    @GetMapping("/")
    public List<Shopping> getList() {
        return service.findAll();
    }



}
