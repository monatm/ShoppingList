package DevMona.SaltShoppingList;

import com.sun.jdi.request.DuplicateRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.ErrorResponseException;

import java.util.List;
import java.util.Optional;

@Service
public class ShoppingService {
    @Autowired
    private Repository repo;


    public Shopping save(Shopping shopping) {
        Shopping existingList = repo.findByTitle(shopping.getTitle());
        if (existingList != null) {
            throw new DuplicateRequestException( shopping.getTitle() + "' already exists");
        }
        if(shopping.getTitle() == null){
            throw new NullPointerException();

        }
        return repo.save(shopping);
    }

    public Optional<Shopping> findById(String id) {
        return repo.findById(id);
    }

    public void deleteById(String id) {
        repo.deleteById(id);
    }

    public List<Shopping> findAll() {
        return repo.findAll();
    }


    public Optional<Shopping> findByTitle(String title) {
        return Optional.ofNullable(repo.findByTitle(title));
    }

}
