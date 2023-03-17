package DevMona.SaltShoppingList;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Shopping{
    @Id
    private String id;
    private String title;
    private String quantity;
    }

