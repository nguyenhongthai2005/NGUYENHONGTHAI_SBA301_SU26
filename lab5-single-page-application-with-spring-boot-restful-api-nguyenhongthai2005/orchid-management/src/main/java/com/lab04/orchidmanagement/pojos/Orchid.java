package com.lab04.orchidmanagement.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Orchid")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchidId")
    private Integer orchidId;

    @NotBlank(message = "Tên Orchid không được để trống")
    @Column(name = "orchidName")
    private String orchidName;

    @NotNull(message = "isNatural không được để trống")
    @Column(name = "isNatural")
    private Boolean isNatural;

    @Column(name = "orchidDescription")
    private String orchidDescription;

    @Column(name = "orchidCategory")
    private String orchidCategory;

    @Column(name = "isAttractive")
    private Boolean isAttractive;

    @Column(name = "orchidURL")
    private String orchidURL;

}
