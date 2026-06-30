package com.lab06.orchid_management.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Orchid")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orchidId;

    private String orchidName;
    private Boolean isNatural;
    private String orchidDescription;
    private String orchidCategory;
    private Boolean isAttractive;
    private String orchidURL;
}
